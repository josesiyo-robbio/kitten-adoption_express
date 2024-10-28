


const express               =   require('express');
const router                =   express.Router();
const RequestsController   =  require('../controller/requestsController');

router.get('/requests', RequestsController.get_all_requests);

module.exports = router;