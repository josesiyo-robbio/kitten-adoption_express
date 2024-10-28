
const moduleREQUESTS = require('../model/adoptionRequests')
const {validateRequiredFields} = require("../../kitten/middleware/validatorApi");

const RequestsController =
{
    get_all_requests: async (req, res) =>
    {
        try
        {
            const requests = await  moduleREQUESTS.all_requests()
            if(requests.length > 0)
            {
                res.status(200).json(requests);
            }
            else
            {
                res.status(404).json({ message: 'No request found' });
            }
        }
        catch (error)
        {
            console.log(error);
            res.status(500).json({ message: 'Error', error: { message: error.message } });
        }
    },



    approve_or_not : async(req,res) =>
    {
        try
        {
            let requiredFields;
            const {id,status} = req.body;
            requiredFields = ['id','status'];


            const validation = validateRequiredFields(req.body, requiredFields);

            if (!validation.success)
            {
                res.status(400).json({message: validation.message, missingFields: validation.missingFields});
                return;
            }

            if(status !== 'rejected' && status !== 'pending' && status !== 'approved'){
                res.status(400).json('invalid request answer');
                return;
            }

            const answer = await moduleREQUESTS.update_approve_or_not(id,status);
            if(!answer)
            {
                res.status(404).json('request not found');
            }
            return res.status(200).json(answer);
        }
        catch (error)
        {
            console.log(error);
            res.status(500).json({ message: 'Error', error: { message: error.message } });
        }
    }


}


module.exports = RequestsController;