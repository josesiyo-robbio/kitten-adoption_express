
const moduleREQUESTS = require('../model/adoptionRequests')

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
    }

}


module.exports = RequestsController;