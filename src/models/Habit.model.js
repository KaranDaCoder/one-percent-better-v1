import mongoose, { Schema } from "mongoose";

const HabitCategories = {
 HEALTH_FITNESS: "Health and Fitness",
 PERSONAL_GROWTH: "Personal Growth and Learning",
 PRODUCTIVITY: "Productivity and Work",
 MENTAL_WELLBEING: "Mental and Emotional Well-being",
 RELATIONSHIPS: "Relationships and Social Connections",
 FINANCES: "Finances and Money Management",
 SUSTAINABILITY: "Sustainability and Environment",
 OTHER: "Other",
};

const HabitSchema = new Schema(
 {
  // Basic info
  habit_name: {
   type: String,
   required: [true, "Habit name is required"],
   unique: true,
   minLength: [3, "Habit name must be at least 3 characters"],
   maxLength: [30, "Habit name cannot exceed more than 30 characters"],
   trim: true,
  },
  habit_description: {
   type: String,
   default: "",
   maxLength: [500, "Habit description cannot exceed 500 characters"],
  },
  habit_start_date: {
   type: Date,
   default: Date.now,
   required: [true, "Habit start date is required"],
  },

  // Questionnaire attributes
  discipline_willpower: {
   type: Number,
   required: [true, "Discipline and willpower is required"],
   default: 5,
   min: [1, "Value must be at least 1"],
   max: [10, "Value must not be greater than 10"],
   validate: {
    validator: Number.isInteger,
    message: "Discipline and willpower must be an integer",
   },
  },
  resources_available: {
   type: Number,
   required: [true, "Resources available is required"],
   default: 5,
   min: [1, "Value must be at least 1"],
   max: [10, "Value must not be greater than 10"],
   validate: {
    validator: Number.isInteger,
    message: "Resources available must be an integer",
   },
  },
  tried_before: {
   type: Number,
   required: [true, "Tried before is required"],
   default: 5,
   min: [1, "Value must be at least 1"],
   max: [10, "Value must not be greater than 10"],
   validate: {
    validator: Number.isInteger,
    message: "Tried before must be an integer",
   },
  },
  frequency_everyday: {
   type: Number,
   required: [true, "Frequency everyday is required"],
   default: 5,
   min: [1, "Value must be at least 1"],
   max: [10, "Value must not be greater than 10"],
   validate: {
    validator: Number.isInteger,
    message: "Frequency everyday must be an integer",
   },
  },
  quit_or_create: {
   type: Number,
   required: [true, "Quit or create is required"],
   default: 5,
   min: [1, "Value must be at least 1"],
   max: [10, "Value must not be greater than 10"],
   validate: {
    validator: Number.isInteger,
    message: "Quit or create must be an integer",
   },
  },

  // Habit difficulty categories
  difficulty: {
   type: String,
   enum: ["Crawling", "Walking", "Running", "Sprinting"],
   default: "Walking",
  },

  // Habit stats
  average_habit_strength: {
   type: Number,
   default: 0,
   validate: {
    validator: (value) => value >= 0 && value <= 10,
    message: "Average habit strength must be between 0 and 10",
   },
  },
  category: {
   type: String,
   enum: Object.values(HabitCategories),
   default: HabitCategories.OTHER,
   required: true,
  },
  is_habit_active: {
   type: Boolean,
   default: false,
  },
  // Relationships
  user_id: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User",
   required: [true, "User ID is required"],
  },
 },
 { timestamps: true }
);

// Pre-save hook to calculate difficulty category based on average habit strength
HabitSchema.pre("save", function (next) {
 const averageStrength = this.average_habit_strength;

 if (averageStrength >= 9) {
  this.difficulty = "Sprinting";
 } else if (averageStrength >= 6) {
  this.difficulty = "Running";
 } else if (averageStrength >= 3) {
  this.difficulty = "Walking";
 } else {
  this.difficulty = "Crawling";
 }

 next();
});

const Habit = mongoose?.models?.Habit || mongoose.model("Habit", HabitSchema);

export default Habit;
