const moduleVALIDATORAPI    =   require('../middleware/validatorApi');
const moduleKITTENS  = require('../model/kittens')
const {validateRequiredFields} = require("../middleware/validatorApi");



const KittensController = 
{
    
    get_all_kittens: async (req, res) => 
    {
        try 
        {
            const allKittens = await moduleKITTENS.select_all_kittens();
    
            if (!allKittens || allKittens.length === 0) 
            {
                return res.status(404).json({ message: 'No kittens found' });
            }
    
            return res.status(200).json({ data: allKittens });
        } 
        catch (error) 
        {
            console.error('Error fetching kittens:', error);
            return res.status(500).json({
                message: 'An error occurred while fetching kittens',
                error: { message: error.message }
            });
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
    },


    add_kitten : async(req,res)=>
    {
        try
        {
            let requiredFields = ['name', 'age', 'breed', 'description', 'photo']
            const {name, age, breed, description, photo} = req.body;
            const validation = validateRequiredFields(req.body, requiredFields);

            if (!validation.success) {
                res.status(400).json({message: validation.message, missingFields: validation.missingFields});
                return;
            }

            const addKitty = await moduleKITTENS.insert_new_kitty(name, age, breed, description, photo);

            if(!addKitty)
            {
                return res.status(400).json({message: 'Error', missingFields: validation.missingFields});
            }

            return res.status(200).json({ kittens: addKitty });

        }
        catch (error)
        {
            console.log(error);
            res.status(500).json({message: 'Error', error: {message: error.message}});
        }
    },



    adopted_kitty : async(req,res)=>
    {
        try
        {
            let requiredFields = ['idKitty'];
            const {idKitty} = req.body;

            const validation = validateRequiredFields(req.body, requiredFields);

            if (!validation.success) {
                res.status(400).json({message: validation.message, missingFields: validation.missingFields});
                return;
            }

            const adopted = await moduleKITTENS.update_adopted(idKitty);
            if(!adopted)
            {
                return res.status(400).json('kitty not found');
            }
            return res.status(200).json({ kittens: adopted });
        }
        catch (error)
        {
            console.log(error);
            res.status(500).json({message: 'Error', error: {message: error.message}});
        }
    },



    update_kitty_info: async (req, res) =>
    {
        const { id, name, age, breed, description, photo } = req.body;
        const fieldsToUpdate = {};

        if (name) fieldsToUpdate.name = name;
        if (age) fieldsToUpdate.age = age;
        if (breed) fieldsToUpdate.breed = breed;
        if (description) fieldsToUpdate.description = description;
        if (photo) fieldsToUpdate.photo = photo;

        try
        {
            const updatedKitty = await moduleKITTENS.update_kitty_info(id, fieldsToUpdate);

            if (!updatedKitty)
            {
                return res.status(404).json({ message: 'Kitty not found' });
            }

            res.status(200).json({ message: 'Kitty updated successfully', kitty: updatedKitty });
        }
        catch (error)
        {
            console.error('Error updating kitty:', error);
            res.status(500).json({ message: 'Error updating kitty', error: error.message });
        }
    }

}


module.exports = KittensController;