const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const auth = require('../middleware/auth');

// @route    GET api/activities
// @desc     Get all activities for current user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user.id }).sort({ timestamp: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
