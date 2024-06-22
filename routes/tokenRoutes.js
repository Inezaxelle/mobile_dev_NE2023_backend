const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');


router.post('/generate', tokenController.generateToken);
router.post('/validate', tokenController.validateToken );
router.post('/tokenHistory', tokenController.getTokenHistory);

module.exports = router;  