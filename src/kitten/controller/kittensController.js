const moduleVALIDATORAPI    =   require('../middleware/validatorApi');
const moduleKITTENS  = require('../model/kittens')



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
    }
}


module.exports = KittensController;