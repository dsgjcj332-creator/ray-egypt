import { Stat, Action, Booking, Order, Project, Appointment } from '../../models/DashboardData.js';

// Get dashboard stats
export const getStats = async (req, res) => {
  try {
    const { system, businessType } = req.query;
    
    const stats = await Stat.find({ system });
    
    if (stats.length === 0) {
      return res.json([]);
    }
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

// Get dashboard actions
export const getActions = async (req, res) => {
  try {
    const { system, businessType } = req.query;
    
    const actions = await Action.find({ system });
    
    if (actions.length === 0) {
      return res.json([]);
    }
    
    res.json(actions);
  } catch (error) {
    console.error('Error fetching actions:', error);
    res.status(500).json({ error: 'Failed to fetch actions' });
  }
};

// Get bookings
export const getBookings = async (req, res) => {
  try {
    const { businessType } = req.query;
    
    const bookings = await Booking.find({ businessType }).limit(10);
    
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Get orders
export const getOrders = async (req, res) => {
  try {
    const { system } = req.query;
    
    const orders = await Order.find({ system }).limit(10);
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Get projects
export const getProjects = async (req, res) => {
  try {
    const { system } = req.query;
    
    const projects = await Project.find({ system }).limit(10);
    
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

// Get appointments
export const getAppointments = async (req, res) => {
  try {
    const { system } = req.query;
    
    const appointments = await Appointment.find({ system }).limit(10);
    
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};

// Create stat
export const createStat = async (req, res) => {
  try {
    const stat = new Stat(req.body);
    await stat.save();
    res.status(201).json(stat);
  } catch (error) {
    console.error('Error creating stat:', error);
    res.status(500).json({ error: 'Failed to create stat' });
  }
};

// Create action
export const createAction = async (req, res) => {
  try {
    const action = new Action(req.body);
    await action.save();
    res.status(201).json(action);
  } catch (error) {
    console.error('Error creating action:', error);
    res.status(500).json({ error: 'Failed to create action' });
  }
};

// Create booking
export const createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};
