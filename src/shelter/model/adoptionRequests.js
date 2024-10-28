const moduleDB                =   require('../../db/postgres');
const moduleRequests = require('../query/queryRequests');



const AdoptionRequests =
{
    all_requests : async()=>
    {
        try
        {
            const result = await moduleDB.manyOrNone
            ({
                text : moduleRequests.SELECT_ALL,
                rowMode : 'json'
            });
            console.log('Consulta SQL:', result);
            return result;
        }
        catch(error)
        {
            console.error('Error:', error);
            throw error;
        }
    },



    update_approve_or_not : async(id,status) =>
    {
        try
        {
            const result = await moduleDB.oneOrNone({
                text : moduleRequests.UPDATE_APPROVE_OR_NOT,
                values : [id,status],
                rowMode : 'json'
            });
            console.log('Consulta SQL:', result);
            return result;
        }
        catch(error)
        {
            console.error('Error:', error);
            throw error;
        }

    }


}


module.exports = AdoptionRequests;