const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Optional auth middleware for anonymous reporting (runs after multer)
const optionalAuth = (req, res, next) => {
  // Check if anonymous after multer has parsed the form
  if (req.body.is_anonymous === 'true' || req.body.is_anonymous === true) {
    // Skip auth for anonymous complaints
    return next();
  }
  // Require auth for regular complaints
  return auth(req, res, next);
};

router.post('/', upload.array('evidence', 5), optionalAuth, complaintController.createComplaint);
router.get('/user/:id', auth, complaintController.getUserComplaints);
router.get('/:id', auth, complaintController.getComplaint);
router.put('/:id/status', auth, complaintController.updateComplaintStatus);
router.put('/:id', auth, complaintController.updateComplaint);
router.delete('/:id', auth, complaintController.deleteComplaint);
router.get('/', auth, complaintController.getAllComplaints);

module.exports = router;
