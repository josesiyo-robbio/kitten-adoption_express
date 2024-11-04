


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
        const requiredFields = ['idKitty'];
        const validation = validateRequiredFields(req.body, requiredFields);
        if (!validation.success) 
        {
            return res.status(400).json({message: validation.message,missingFields: validation.missingFields});
        }

        const {idKitty} = req.body;

        try
        {
            const kitty = await moduleKITTENS.select_one_kitty(idKitty);
            if (!kitty)
            {
                return res.status(404).json({ message: 'Cat not found' });
            }
            return res.status(200).json({ kitty });


        }
        catch (error) 
        {
            console.error('Error fetching kitty:', error);
            return res.status(500).json({ message: 'An error occurred while fetching the cat',error: { message: error.message }});
        }
    },



    add_kitten : async(req,res)=>
    {
        let requiredFields = ['name', 'age', 'breed', 'description', 'photo']
        const validation = validateRequiredFields(req.body, requiredFields);
        if (!validation.success) 
        {
            res.status(400).json({message: validation.message, missingFields: validation.missingFields});
            return;
        }

        const {name, age, breed, description, photo} = req.body;

        try 
        {
            const addKitty = await moduleKITTENS.insert_new_kitty(name, age, breed, description, photo);
    
            if (!addKitty) 
            {
                return res.status(400).json({ message: 'Failed to add cat, please check provided data' });
            }
    
            return res.status(201).json({ message: 'Cat successfully added', kitten: addKitty });
        } 
        catch (error) 
        {
            console.error('Error adding new kitten:', error);
            return res.status(500).json({ message: 'An error occurred while adding the cat', error: { message: error.message } });
        }
    },



    update_kitty_info: async (req, res) => 
    {
        const { id, name, age, breed, description, photo } = req.body;
    
        // Ensure the 'id' field is present
        if (!id) {
            return res.status(400).json({ message: 'Missing required field: id' });
        }
    
        // Build the fields to update
        const fieldsToUpdate = {};
        if (name) fieldsToUpdate.name = name;
        if (age) fieldsToUpdate.age = age;
        if (breed) fieldsToUpdate.breed = breed;
        if (description) fieldsToUpdate.description = description;
        if (photo) fieldsToUpdate.photo = photo;
    
        // Check if there's actually something to update
        if (Object.keys(fieldsToUpdate).length === 0) 
        {
            return res.status(400).json({ message: 'No fields provided to update' });
        }
    
        try 
        {
            const updatedKitty = await moduleKITTENS.update_kitty_info(id, fieldsToUpdate);
    
            if (!updatedKitty) 
            {
                return res.status(404).json({ message: 'Kitty not found' });
            }
    
            return res.status(200).json({ message: 'Kitty updated successfully', kitty: updatedKitty });
        } 
        catch (error) 
        {
            console.error('Error updating kitty:', error);
            return res.status(500).json({ message: 'An error occurred while updating the kitty information', error: { message: error.message } });
        }
    },

}

module.exports = KittensController;