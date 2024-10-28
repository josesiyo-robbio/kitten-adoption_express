
const moduleDB                =   require('../../db/postgres');
const moduleKITTENSQUERY = require('../query/kittensQuery');
const moduleKITTENS = require("./kittens");
const {validateRequiredFields} = require("../middleware/validatorApi");

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
    },


    select_one_kitty : async(idKitty)=>
    {
        try
        {
            const result = await moduleDB.oneOrNone({
                text:  moduleKITTENSQUERY.SELECT_ONE_KITTY,
                values : [idKitty],
                rowMode : 'json'

            });
            console.log('Consulta SQL:', idKitty);
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