import mongoose, { Schema } from "mongoose"
import User from "./User.model";


const HabitCategories = {
 HEALTH_FITNESS: 'Health and Fitness',
 PERSONAL_GROWTH: 'Personal Growth and Learning',
 PRODUCTIVITY: 'Productivity and Work',
 MENTAL_WELLBEING: 'Mental and Emotional Well-being',
 RELATIONSHIPS: 'Relationships and Social Connections',
 FINANCES: 'Finances and Money Management',
 SUSTAINABILITY: 'Sustainability and Environment',
 OTHER: 'Other'
};


const HabitSchema = new Schema({
 // basic info about the habit
 habit_name: {
  type: String,
  required: [true, "habit name is required"],
  unique: true,
  minLength: [3, "habit name must be at least 3 characters"],
  maxLength: [30, "habit name cannot exceed more than 30 characters"],
  trim: true
 },
 habit_description: {
  type: String,
  default: "",
  maxLength: [500, "habit description cannot exceed 500 characters"]
 },
 habit_start_date: {
  type: Date,
  default: Date.now,
  required: [true, "habit start date is required"]
 },
 
 // questionaires
 discipline_willpower: {
  type: Number,
  required: [true, "discipline an willpower is required"],
  default: 5,
  min: [1, "value must be atleast 1"],
  max: [10, "value must not be greater than 10"],
  validate: {
   validator: Number.isInteger,
   message: "discipline and willpower must be an integer"
  }
 },
 resources_available: {
  type: Number,
  required: [true, "resources available is required"],
  default: 5,
  min: [1, "value must be atleast 1"],
  max: [10, "value must not be greater than 10"],
  validate: {
   validator: Number.isInteger,
   message: "resources available must be an integer"
  }
 },
 tried_before: {
  type: Number,
  required: [true, "tried before is required"],
  default: 5,
  min: [1, "value must be atleast 1"],
  max: [10, "value must not be greater than 10"],
  validate: {
   validator: Number.isInteger,
   message: "tried before  must be an integer"
  }
 },
 frequency_everyday: {
  type: Number,
  required: [true, "frequency everyday is required"],
  default: 5,
  min: [1, "value must be atleast 1"],
  max: [10, "value must not be greater than 10"],
  validate: {
   validator: Number.isInteger,
   message: "frequency everyday must be an integer"
  }
 },
 quit_or_create: {
  type: Number,
  required: [true, "quit or create is required"],
  default: 5,
  min: [1, "value must be atleast 1"],
  max: [10, "value must not be greater than 10"],
  validate: {
   validator: Number.isInteger,
   message: "quit or create  must be an integer"
  }
 },

 //difficulty from questionaires
 difficulty : {
  type : String,
  enum : ['Effortless','Manageable','Formidable'],
  default: 'Manageable'
 },
 // habit stats:
 initial_growth_rate_multiplier: {
  type: Number,
  default: 1.01
 },

 initial_decay_rate_multiplier: {
  type: Number,
  default: 0.01
 },

 initial_habit_strength: {
  type: Number,
  required: true
 },
 current_habit_strength: {
  type: Number,
  required: true
 },
 expected_habit_strength: {
  type: Number,
  default: 0
 },
 average_habit_strength: {
  type: Number,
  default: 0
 },
 category: {
  type: String,
  enum: Object.values(HabitCategories),
  default: HabitCategories.OTHER,
  required: true,
 },
 is_habit_active: {
  type: Boolean,
  default: false
 },
 // relationships:
 user_id: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: [true, "User ID is required"],
 }
}, { timestamps: true })

// Pre-save hook to calculate habit difficulty based on strength
HabitSchema.pre('save', function (next) {
 if (this.initial_habit_strength >= 8) {
  this.difficulty = 'Effortless';
 } else if (this.initial_habit_strength >= 4) {
  this.difficulty = 'Manageable';
 } else {
  this.difficulty = 'Formidable';
 }
 next();
});

const Habit = mongoose?.models?.Habit || mongoose.model('Habit', HabitSchema);

export default Habit;