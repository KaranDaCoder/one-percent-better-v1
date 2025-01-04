import mongoose, { Schema } from "mongoose"
import Habit from "./Habit.model";

const HabitTrackerSchema = new Schema({

 // relationships
 habit_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Habit',
  required: true
 },
 user_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
 },

 // daily updates
 habit_tracker_status: {
  type: String,
  default: 'Pending',
  required: true,
  enum: ['Completed', 'Missed', 'Pending', 'Partial', 'Upcoming']
 },
 habit_tracker_notes: {
  type: String,
 },

 // daily-analytics
 habit_tracker_daily_strength: {
  type: Number,
  required: true,
 },

 habit_tracker_expected_strength: {
  type: Number,
  required: true
 },
 habit_tracker_logged_at: {
  type: Date,
  required: true,
  default: Date.now
 },
 is_habit_tracker_updated: {
  type: Boolean,
  default: false
 },
 is_default_tracker: {
  type: Boolean,
  default: false
 }
}, { timestamps: true })

const HabitTracker =
 mongoose.models.HabitTracker || mongoose.model('HabitTracker', HabitTrackerSchema);
export default HabitTracker;