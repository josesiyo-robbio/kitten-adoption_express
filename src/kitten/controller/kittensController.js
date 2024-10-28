const moduleVALIDATORAPI    =   require('../middleware/validatorApi');
const moduleKITTENS  = require('../model/kittens')
const {validateRequiredFields} = require("../middleware/validatorApi");



const KittensController = 
{
    get_all_kittens : async(req,res) =>
    {
        try
        {
            const allKittens = await moduleKITTENS.select_all_kittens();

            if(allKittens)
            {
                return res.status(200).json({ allKittens });
            }
        }
        catch (error) 
        {
            console.log(error);
            res.status(500).json({ message: 'Error', error: { message: error.message } });
        }
    },



    select_one_kitty : async(req,res)=>
    {
        let requiredFields;
        try
        {
            requiredFields = ['idKitty'];
            const {idKitty} = req.body;
            const validation = validateRequiredFields(req.body, requiredFields);

            if (!validation.success) {
                res.status(400).json({message: validation.message, missingFields: validation.missingFields});
                return;
            }

            const kitty = await moduleKITTENS.select_one_kitty(idKitty);
            if (!kitty)
            {
                return res.status(404).json({ message: 'Cat not found' });
            }

            return res.status(200).json({ kitty });


        }
        catch (error)
        {
            console.log(error);
            res.status(500).json({message: 'Error', error: {message: error.message}});
        }
    }
}


module.exports = KittensController;