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
    },


    select_one : async(id) =>
    {
        try
        {
            const result = await moduleDB.oneOrNone({
                text: moduleRequests.SELECT_ONE,
                values : [id],
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



    insert_new_one : async(kitten_id, applicant_name, phone, email, message, social_media_url)=>
    {
        try
        {
            const result = await moduleDB.oneOrNone({
                text : moduleRequests.INSERT_NEW_ONE,
                values : [kitten_id, applicant_name, phone, email, message, social_media_url],
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



    select_kitty_status : async(idKitty) =>
    {
        try
        {
            const result = await moduleDB.oneOrNone({
                text : moduleRequests.SELECT_ONE_KITTY,
                values : [idKitty],
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