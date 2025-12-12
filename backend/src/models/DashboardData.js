import mongoose from 'mongoose';

// Generic Dashboard Stat Schema
const StatSchema = new mongoose.Schema({
  id: String,
  title: String,
  value: String,
  sub: String,
  icon: String,
  color: String,
  system: String,
  createdAt: { type: Date, default: Date.now }
});

// Generic Dashboard Action Schema
const ActionSchema = new mongoose.Schema({
  id: String,
  label: String,
  icon: String,
  color: String,
  system: String,
  createdAt: { type: Date, default: Date.now }
});

// Booking Data Schema
const BookingSchema = new mongoose.Schema({
  id: String,
  time: String,
  client: String,
  service: String,
  status: { type: String, enum: ['confirmed', 'pending', 'completed', 'cancelled'] },
  phone: String,
  businessType: String,
  createdAt: { type: Date, default: Date.now }
});

// Order/Laundry Data Schema
const OrderSchema = new mongoose.Schema({
  id: String,
  items: String,
  customer: String,
  status: { type: String, enum: ['pending', 'processing', 'ready', 'urgent', 'delivered'] },
  system: String,
  createdAt: { type: Date, default: Date.now }
});

// Project Data Schema
const ProjectSchema = new mongoose.Schema({
  id: String,
  name: String,
  stage: String,
  progress: Number,
  status: { type: String, enum: ['active', 'delayed', 'completed'] },
  system: String,
  createdAt: { type: Date, default: Date.now }
});

// Appointment Data Schema
const AppointmentSchema = new mongoose.Schema({
  id: String,
  client: String,
  service: String,
  staff: String,
  time: String,
  status: { type: String, enum: ['confirmed', 'in_progress', 'waiting', 'completed'] },
  system: String,
  createdAt: { type: Date, default: Date.now }
});

// Export models
export const Stat = mongoose.model('Stat', StatSchema);
export const Action = mongoose.model('Action', ActionSchema);
export const Booking = mongoose.model('Booking', BookingSchema);
export const Order = mongoose.model('Order', OrderSchema);
export const Project = mongoose.model('Project', ProjectSchema);
export const Appointment = mongoose.model('Appointment', AppointmentSchema);
