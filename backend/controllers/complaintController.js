const Complaint = require('../models/Complaint');
const Notification = require('../models/Notification');

// Create new complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, category, location, description, is_anonymous } = req.body;
    const user_id = is_anonymous === 'true' ? null : req.user?.id;

    // Validation
    if (!title || !category || !location || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const evidence_file = req.file ? req.file.filename : null;
    const evidence_files = req.files ? req.files.map(f => f.filename) : [];

    const result = await Complaint.create({
      user_id,
      title,
      category,
      location,
      description,
      evidence_file,
      evidence_files: evidence_files.length > 0 ? evidence_files : null,
      is_anonymous: is_anonymous === 'true'
    });

    // Create notification for registered users
    if (user_id) {
      await Notification.createStatusNotification(result.insertId, user_id, null, 'Pending');
    }

    res.status(201).json({
      success: true,
      message: is_anonymous === 'true' 
        ? 'Anonymous complaint filed successfully. Save your tracking code!' 
        : 'Complaint filed successfully',
      data: {
        complaintId: result.insertId,
        tracking_code: result.tracking_code,
        evidence_file,
        evidence_files
      }
    });
  } catch (error) {
    console.error('Create complaint error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating complaint'
    });
  }
};

// Get user complaints
exports.getUserComplaints = async (req, res) => {
  try {
    const userId = req.params.id;

    const complaints = await Complaint.findByUserId(userId);

    res.json({
      success: true,
      message: 'Complaints retrieved successfully',
      data: complaints
    });
  } catch (error) {
    console.error('Get complaints error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving complaints'
    });
  }
};

// Get single complaint
exports.getComplaint = async (req, res) => {
  try {
    const complaintId = req.params.id;

    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.json({
      success: true,
      message: 'Complaint retrieved successfully',
      data: complaint
    });
  } catch (error) {
    console.error('Get complaint error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving complaint'
    });
  }
};

// Update complaint status
exports.updateComplaintStatus = async (req, res) => {
  try {
    const complaintId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Please provide status'
      });
    }

    // Get old complaint to check user and old status
    const oldComplaint = await Complaint.findById(complaintId);
    
    const affectedRows = await Complaint.updateStatus(complaintId, status);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    // Create notification for status change (only for registered users)
    if (oldComplaint && oldComplaint.user_id) {
      await Notification.createStatusNotification(
        complaintId, 
        oldComplaint.user_id, 
        oldComplaint.status, 
        status
      );
    }

    res.json({
      success: true,
      message: 'Complaint status updated successfully'
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating complaint status'
    });
  }
};

// Get all complaints (for admin)
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.getAll();

    res.json({
      success: true,
      message: 'All complaints retrieved successfully',
      data: complaints
    });
  } catch (error) {
    console.error('Get all complaints error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving complaints'
    });
  }
};

// Update complaint
exports.updateComplaint = async (req, res) => {
  try {
    const complaintId = req.params.id;
    const { title, category, location, description } = req.body;

    if (!title || !category || !location || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const affectedRows = await Complaint.update(complaintId, {
      title,
      category,
      location,
      description
    });

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.json({
      success: true,
      message: 'Complaint updated successfully'
    });
  } catch (error) {
    console.error('Update complaint error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating complaint'
    });
  }
};

// Delete complaint
exports.deleteComplaint = async (req, res) => {
  try {
    const complaintId = req.params.id;

    const affectedRows = await Complaint.delete(complaintId);

    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.json({
      success: true,
      message: 'Complaint deleted successfully'
    });
  } catch (error) {
    console.error('Delete complaint error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting complaint'
    });
  }
};
