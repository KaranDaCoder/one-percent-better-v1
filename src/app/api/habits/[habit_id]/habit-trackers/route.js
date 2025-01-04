import { connectDb } from "@/lib/dbConnect";
import { validateUserSession } from "@/lib/validateUserSession";
import Habit from "@/models/Habit.model";
import HabitTracker from "@/models/HabitTracker.model";
import { NextResponse } from "next/server";
import { validateDates, validateHabitTrackerDates } from "@/lib/dateValidations";

//create habit trackers
export const POST = async (request, { params }) => {
 const { habit_id } = await params;
 console.log(`HABIT ID AS PATH PARAM : ${habit_id}`)
 await connectDb();
 try {
  const { isAuthenticated, session, error } = await validateUserSession();
  if (!isAuthenticated) {
   return NextResponse.json({ error: error }, { status: 401 });
  }

  const user_id = session?.user?._id;

  const habit = await Habit.findById(habit_id);
  if (!habit) {
   return NextResponse.json({ error: `habit does not exist or deleted hence, cannot create habit tracker` }, { status: 500 })

  }
  const recent_habit_tracker = await HabitTracker.findOne({habit_id: habit_id }).sort({ habit_tracker_logged_at: -1 });
  if (!recent_habit_tracker || recent_habit_tracker === null) {
   return NextResponse.json({ error: `oops, something went wrong - check if default tracker exists for the habit.` }, { status: 500 })
  }
  console.log(`RECENT HABIT TRACKER:::`)
  console.log(recent_habit_tracker)
  let recent_tracker_logged_at_formatted = new Date(recent_habit_tracker.habit_tracker_logged_at).toISOString().slice(0, 10);
  console.log(recent_tracker_logged_at_formatted)
  const { is_valid, recentHabitTrackerDate, today } = await validateHabitTrackerDates(recent_tracker_logged_at_formatted);
  if (!is_valid) {
   return NextResponse.json({ error: `sorry, cannot add more trackers until ${recentHabitTrackerDate}.` }, { status: 404 })
  }
  // create 3 trackers in future.

  const create_habit_tracker_arr = []
  for (let i = 0; i < 3; i++) {

   const new_habit_tracker_date = recentHabitTrackerDate.plus({ days: i + 1 });

   let create_tracker = {
    habit_id: habit_id,
    user_id,
    habit_tracker_status: 'Pending',
    habit_tracker_notes: `auto-generated for ${new_habit_tracker_date}`,
    habit_tracker_daily_strength: habit.current_habit_strength,
    habit_tracker_expected_strength: habit.expected_habit_strength,
    habit_tracker_logged_at: new_habit_tracker_date,
    is_habit_tracker_updated: false,
    is_default_tracker: false
   }
   create_habit_tracker_arr.push(create_tracker);
  }

  const new_habit_tracker = await HabitTracker.create(create_habit_tracker_arr);

  return NextResponse.json({ message: `habit tracker created successfully`, data: new_habit_tracker }, { status: 201 })
 } catch (error) {
  console.error(error);
  return NextResponse.json({ error: error.message }, { status: 500 })
 }
};


// get all habit trackers
export const GET = async (request, { params }) => {
 const { habit_id } = await params;
 await connectDb();
 try {
  const { isAuthenticated, session, error } = await validateUserSession();
  if (!isAuthenticated) {
   return NextResponse.json({ error: error }, { status: 401 });
  }

  const user_id = session?.user?._id;
  const habit = await Habit.findById(habit_id);
  if (!habit) {
   return NextResponse.json({ error: `habit not found or deleted. cannot fetch associated trackers` }, { status: 404 })

  }
  const habit_tracker = await HabitTracker.find({ user_id: user_id, habit_id: habit_id }).sort({ habit_tracker_logged_at: 1 });
  return NextResponse.json({ message: `habit trackers fetched successfully`, data: habit_tracker }, { status: 200 })
 } catch (error) {
  console.error(error);
  return NextResponse.json({ error: error.message }, { status: 500 })
 }
};