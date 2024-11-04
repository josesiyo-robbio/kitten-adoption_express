


const moduleDB              =   require('../../db/postgres');
const moduleKITTENSQUERY    =   require('../query/kittensQuery');



const Kittens =
{
    select_all_kittens : async()=>
    {
        try
        {
            const result = await moduleDB.manyOrNone
            ({
                text    :   moduleKITTENSQUERY.SELECT_ALL_KITTENS,
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
    },



    select_one_kitty : async(idKitty)=>
    {
        try
        {
            const result = await moduleDB.oneOrNone
            ({
                text    :   moduleKITTENSQUERY.SELECT_ONE_KITTY,
                values  :   [idKitty],
                rowMode :   'json'
            });
            console.log('Consulta SQL:', idKitty);
            return result;
        }
        catch(error)
        {
            console.error('Error:', error);
            throw error;
        }
    },



    insert_new_kitty : async(name, age, breed, description, photo)=>
    {
        try
        {
            const result = await moduleDB.oneOrNone
            ({
                text        :   moduleKITTENSQUERY.INSERT_ONE_KITTY,
                values      :   [name, age, breed, description, photo],
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



    update_adopted : async(idKitty)=>
    {
        try
        {
            const result = await moduleDB.oneOrNone
            ({
                text        :   moduleKITTENSQUERY.UPDATE_ADEOPTED,
                values      :   [idKitty],
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



    update_kitty_info: async (id, fieldsToUpdate) =>
    {
        try
        {
            //Initializes the array of columns and values for the query
            const columns = [];
            const values = [id];  // id should always be the first value

            // Iterates over the fields to update
            Object.keys(fieldsToUpdate).forEach((field, index) => {
                columns.push(`${field} = $${index + 2}`);  // `$index + 2` because id is $1
                values.push(fieldsToUpdate[field]);
            });

            // Dynamic Query
            const query = `
            UPDATE kittens  
            SET ${columns.join(', ')} 
            WHERE id = $1 
            RETURNING *; `;

            const result = await moduleDB.oneOrNone({ text: query, values, rowMode: 'json' });
            console.log('Actualización exitosa:', result);
            return result;
        }
        catch (error)
        {
            console.error('Error en la actualización:', error);
            throw error;
        }
    }

}

module.exports = Kittens;