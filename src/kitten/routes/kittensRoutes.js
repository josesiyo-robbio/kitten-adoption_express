

const KittensController = require('../controller/kittensController');
const express               =   require('express');
const router                =   express.Router();



router.get('/kittens',KittensController.get_all_kittens);
router.post('/kitty',KittensController.select_one_kitty);
router.post('/add-kitty',KittensController.add_kitten);
router.patch('/adopted-kitty',KittensController.adopted_kitty);
router.patch('/edit-kitty',KittensController.update_kitty_info);


module.exports = router;