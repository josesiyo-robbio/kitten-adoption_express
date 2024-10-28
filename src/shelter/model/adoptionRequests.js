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



    update_approve_or_not: async (id, status, idKitty) =>
    {
        if (status === 'pending' || status === 'rejected')
        {
            try
            {
                const result = await moduleDB.oneOrNone({
                    text: moduleRequests.UPDATE_APPROVE_OR_NOT,
                    values: [id, status],
                    rowMode: 'json'
                });
                console.log('Consulta SQL:', result);
                return result;
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        }
        else if (status === 'approved')
        {
            try
            {
                const result = await moduleDB.tx(async t => {
                    // Actualiza el estado de la solicitud
                    await t.one(moduleRequests.UPDATE_APPROVE_OR_NOT, [id, status]);

                    // Actualiza el estado del gatito como adoptado
                    const kittenResult = await t.one(moduleRequests.UPDATE_KITTEN, [idKitty]);

                    // Devuelve ambos resultados si es necesario
                    return { adoptionRequest: 'Updated', kitten: kittenResult };
                });
                return result;
            }
            catch (error)
            {
                console.error('Error:', error);
                throw error;
            }
        }
    },


    getKittyStatus: async (idKitty) =>
    {
        try
        {
            const result = await moduleDB.oneOrNone({
                text: 'SELECT adopted FROM kittens WHERE id = $1',
                values: [idKitty],
                rowMode: 'json'
            });
            return result || { adopted: false };
        }
        catch (error)
        {
            console.error('Error:', error);
            throw error;
        }
    },


    rejectOtherRequests: async (idKitty, requestId) => {
        try {
            await moduleDB.none({
                text: `
                UPDATE adoption_requests 
                SET status = 'rejected' 
                WHERE kitten_id = $1 AND id != $2
            `,
                values: [idKitty, requestId]
            });
        } catch (error) {
            console.error('Error rejecting other requests:', error);
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