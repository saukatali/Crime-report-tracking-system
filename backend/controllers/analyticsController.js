const Complaint = require('../models/Complaint');

// Get analytics stats
exports.getAnalytics = async (req, res) => {
  try {
    const stats = await Complaint.getStats();
    const categoryStats = await Complaint.getCategoryStats();
    const monthlyTrends = await Complaint.getMonthlyTrends();

    res.json({
      success: true,
      data: {
        overview: stats,
        categories: categoryStats,
        trends: monthlyTrends
      }
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics'
    });
  }
};

// Track anonymous complaint
exports.trackComplaint = async (req, res) => {
  try {
    const { trackingCode } = req.params;
    const complaint = await Complaint.findByTrackingCode(trackingCode);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found with this tracking code'
      });
    }

    res.json({
      success: true,
      data: complaint
    });
  } catch (error) {
    console.error('Track complaint error:', error);
    res.status(500).json({
      success: false,
      message: 'Error tracking complaint'
    });
  }
};
