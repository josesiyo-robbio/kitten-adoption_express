

const KittensController = require('../controller/kittensController');
const express               =   require('express');
const router                =   express.Router();



router.get('/kittens',KittensController.get_all_kittens);
router.post('/kitty',KittensController.select_one_kitty);


module.exports = router;