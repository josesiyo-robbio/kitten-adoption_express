
const moduleDB                =   require('../../db/postgres');
const moduleKITTENSQUERY = require('../query/kittensQuery');

const Kittens =
{
    select_all_kittens : async()=>
    {
        try
        {
            const result = await moduleDB.manyOrNone
            ({
                text : moduleKITTENSQUERY.SELECT_ALL_KITTENS,
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


module.exports = Kittens;