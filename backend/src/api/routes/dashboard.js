import express from 'express';
import { Stat, Action } from '../../models/DashboardData.js';

const router = express.Router();

// Get dashboard stats from MongoDB
router.get('/:system/stats', async (req, res) => {
  try {
    const { system } = req.params;
    const stats = await Stat.find({ system });
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Get dashboard actions from MongoDB
router.get('/:system/actions', async (req, res) => {
  try {
    const { system } = req.params;
    const actions = await Action.find({ system });
    res.json(actions);
  } catch (error) {
    console.error('Error fetching actions:', error);
    res.status(500).json({ error: 'Failed to fetch actions' });
  }
});

export default router;
