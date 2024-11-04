const moduleDB                =   require('../../db/postgres');
const moduleRequests = require('../query/queryRequests');



const AdoptionRequests =
{
    all_requests: async () => 
    {
        try 
        {
            const result = await moduleDB.manyOrNone({ text: moduleRequests.SELECT_ALL, rowMode: 'json' });
            console.log('Consulta SQL:', result);
            return result;
        } 
        catch (error) 
        {
            console.error('Error fetching all requests:', error);
            throw error;
        }
    },



    update_approve_or_not: async (id, status, idKitty) => 
    {
        let result;
    
        try 
        {
            if (status === 'pending' || status === 'rejected') 
            {
                result = await moduleDB.oneOrNone
                ({
                    text    :   moduleRequests.UPDATE_APPROVE_OR_NOT,
                    values  :   [id, status],
                    rowMode :   'json'
                });
                console.log('Consulta SQL (pending/rejected):', result);
            } 
            else if (status === 'approved') 
            {
                result = await moduleDB.tx(async t => {
                    //Update the status of the request
                    await t.one(moduleRequests.UPDATE_APPROVE_OR_NOT, [id, status]);
    
                    // Update the kitten's status as adopted
                    const kittenResult = await t.one(moduleRequests.UPDATE_KITTEN, [idKitty]);
                    
                    // Return both results if necessary
                    return { adoptionRequest: 'Updated', kitten: kittenResult };
                });
                console.log('Consulta SQL (approved):', result);
            }
            return result;
        } 
        catch (error) 
        {
            console.error('Error in update_approve_or_not:', error);
            throw error;
        }
    },



    getKittyStatus: async (idKitty) =>
    {
        try
        {
            const result = await moduleDB.oneOrNone
            ({
                text    : moduleRequests.SELECT_ADOPTED,
                values  : [idKitty],
                rowMode : 'json'
            });
            return result || { adopted: false };
        }
        catch (error)
        {
            console.error('Error:', error);
            throw error;
        }
    },



    rejectOtherRequests: async (idKitty, requestId) => 
    {
        try 
        {
            await moduleDB.none
            ({
                text    : UPDATE_REJECT_OTHERS,
                values  : [idKitty, requestId]
            });
        } 
        catch (error) 
        {
            console.error('Error rejecting other requests:', error);
            throw error;
        }
    },



    select_one : async(id) =>
    {
        try
        {
            const result = await moduleDB.oneOrNone
            ({
                text        :   moduleRequests.SELECT_ONE,
                values      :   [id],
                rowMode     :   'json'
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
            const result = await moduleDB.oneOrNone
            ({
                text        :   moduleRequests.INSERT_NEW_ONE,
                values      :   [kitten_id, applicant_name, phone, email, message, social_media_url],
                rowMode     :   'json'
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
            const result = await moduleDB.oneOrNone
            ({
                text    :   moduleRequests.SELECT_ONE_KITTY,
                values  :   [idKitty],
                rowMode :   'json'
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