


const express               =   require('express');
const router                =   express.Router();
const RequestsController   =  require('../controller/requestsController');

router.get('/requests', RequestsController.get_all_requests);
router.patch('/approve-or-not',RequestsController.approve_or_not);
router.post('/info',RequestsController.info);
router.post('/new-request',RequestsController.add_new_one);

module.exports = router;