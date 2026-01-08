const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/:id', auth, userController.getUserProfile);
router.put('/:id/profile', auth, userController.updateUserProfile);
router.delete('/:id', auth, userController.deleteUserAccount);

module.exports = router;
