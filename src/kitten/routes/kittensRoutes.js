

const KittensController = require('../controller/kittensController');
const express               =   require('express');
const router                =   express.Router();


router.get('/kittens',KittensController.get_all_kittens);


module.exports = router;