


const moduleREQUESTS            = require('../model/adoptionRequests')
const {validateRequiredFields}  = require("../../kitten/middleware/validatorApi");



const RequestsController =
{
    get_all_requests: async (req, res) => 
    {
        try 
        {
            const requests = await moduleREQUESTS.all_requests();
            res.status(200).json(requests);
        } 
        catch (error) 
        {
            console.error('Error fetching requests:', error);
            res.status(500).json({ message: 'An error occurred while fetching requests', error: { message: error.message } });
        }
    },



    approve_or_not: async (req, res) => 
    {
        const requiredFields = ['id', 'status'];
        const validation = validateRequiredFields(req.body, requiredFields);
    
        if (!validation.success) 
        {
            return res.status(400).json({
                message: validation.message,
                missingFields: validation.missingFields
            });
        }

        const { id, status, idKitty } = req.body;

        try 
        {
            if (!['rejected', 'pending', 'approved'].includes(status)) 
            {
                return res.status(400).json({ message: 'Invalid status. Must be "rejected", "pending", or "approved".' });
            }
    
            if (status === 'approved') 
            {
                // Verify the status of the kitty before approving the adoption
                const kittyStatus = await moduleREQUESTS.getKittyStatus(idKitty); 
    
                if (kittyStatus.adopted) 
                {
                    return res.status(400).json({ message: 'Kitty has already been adopted.' });
                }
    
                // Mark other requests for the same kitty as "rejected"
                await moduleREQUESTS.rejectOtherRequests(idKitty, id); 
    
                const adopted = await moduleREQUESTS.update_approve_or_not(id, status, idKitty);
                if (adopted) 
                {
                    return res.status(200).json({ message: 'Request approved successfully', request: adopted });
                }
            } 
            else 
            {
                const answer = await moduleREQUESTS.update_approve_or_not(id, status, idKitty);
                if (!answer) 
                {
                    return res.status(404).json({ message: 'Request not found' });
                }
                return res.status(200).json({ message: 'Request status updated successfully', request: answer });
            }
        } 
        catch (error) 
        {
            console.error('Error approving/rejecting request:', error);
            return res.status(500).json({ message: 'An error occurred while processing the request', error: { message: error.message } });
        }
    },



    info : async(req,res) =>
    {
        const requiredFields = ['id'];
        const validation = validateRequiredFields(req.body, requiredFields);

        if (!validation.success)
        {
            res.status(400).json({message: validation.message, missingFields: validation.missingFields});
            return;
        }

        const {id} = req.body;

        try
        {
            const info = await moduleREQUESTS.select_one(id);
            if (!info) 
            {
                return res.status(404).json({ message: 'Request not found' });
            }
            return res.status(200).json(info);
        }
        catch (error) 
        {
            console.error('Error fetching request info:', error);
            return res.status(500).json({ message: 'An error occurred while fetching request info', error: { message: error.message } });
        }
    },



    add_new_one: async (req, res) => 
    {
        const requiredFields = ['kitten_id', 'applicant_name', 'phone', 'email', 'message', 'social_media_url'];
        const validation = validateRequiredFields(req.body, requiredFields);
        if (!validation.success) 
        {
            return res.status(400).json({ message: 'Missing required fields', missingFields: validation.missingFields });
        }

        const { kitten_id, applicant_name, phone, email, message, social_media_url } = req.body;

        try 
        {
            const availableKitty = await moduleREQUESTS.select_kitty_status(kitten_id);
    
            if (!availableKitty) 
            {
                return res.status(400).json({ message: 'Sorry, this kitten has already been adopted' });
            }
    
            const newRequest = await moduleREQUESTS.insert_new_one(kitten_id, applicant_name, phone, email, message, social_media_url );
    
            if (!newRequest) 
            {
                return res.status(400).json({ message: 'Invalid request. Please check provided data.' });
            }
    
            return res.status(201).json({ message: 'Request successfully created', request: newRequest });
        } 
        catch (error) 
        {
            console.error('Error adding new request:', error);
            return res.status(500).json({ message: 'An error occurred while adding the request', error: { message: error.message } });
        }
    },

}


module.exports = RequestsController;