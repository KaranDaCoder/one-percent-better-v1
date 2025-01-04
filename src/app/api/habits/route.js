import { connectDb } from "@/lib/dbConnect";
import { validateDates } from "@/lib/dateValidations";
import { validateUserSession } from "@/lib/validateUserSession";
import Habit from "@/models/Habit.model";
import HabitTracker from "@/models/HabitTracker.model";
import { NextResponse } from "next/server";

//get all habits
export const GET = async (request) => {
  await connectDb();
  const { searchParams } = new URL(request.url);
  const habit_name = searchParams.get('habit_name');
  const habit_description = searchParams.get('habit_desc');
  const category = searchParams.get('category');
  const status = searchParams.get('status'); // 'active' or 'inactive'
  const start_date = searchParams.get('start_date');
  const end_date = searchParams.get('end_date');
  let query = {};

  // Filter by category if provided
  if (category) {
    query.category = category;
  }

  if (habit_name) {
    query.habit_name = { $regex: habit_name, $options: 'i' }
  }

  if (habit_description) {
    query.habit_description = { $regex: habit_description, $options: 'i' }
  }
  // Filter by status if provided
  if (status === 'active') {
    query.is_habit_active = true;
  } else if (status === 'inactive') {
    query.is_habit_active = false;
  }

  // Filter by start_date and end_date if provided
  if (start_date || end_date) {
    query.habit_start_date = {};
    if (start_date) {
      query.habit_start_date.$gte = new Date(start_date);
    }
    if (end_date) {
      query.habit_start_date.$lte = new Date(end_date);
    }
  }
  try {
    const { isAuthenticated, session, error } = await validateUserSession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: error }, { status: 401 });
    }

    const user_id = session?.user?._id;
    const fetchAllHabits = await Habit.find({ user_id: user_id, ...query });

    return NextResponse.json({ message: `habits fetched for user successfully`, data: fetchAllHabits }, { status: 200 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
};

//create a habit
export const POST = async (request, response) => {
  await connectDb();
  const { habit_name, habit_description, habit_start_date, discipline_willpower, resources_available, tried_before, quit_or_create, frequency_everyday, category } = await request.json();
  try {
    const { isAuthenticated, session, error } = await validateUserSession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: error }, { status: 401 });
    }

    const user_id = session?.user?._id;

    // request json validations
    if (
      (!habit_name || habit_name.trim().length < 3) ||
      typeof discipline_willpower !== "number" || isNaN(discipline_willpower) || discipline_willpower > 10 ||
      typeof resources_available !== "number" || isNaN(resources_available) || resources_available > 10 ||
      typeof tried_before !== "number" || isNaN(tried_before) || tried_before > 10 ||
      typeof quit_or_create !== "number" || isNaN(quit_or_create) || quit_or_create > 10 ||
      typeof frequency_everyday !== "number" || isNaN(frequency_everyday) || frequency_everyday > 10
    ) {
      return NextResponse.json({ error: `oops... check habit details for habit creation and retry.` }, { status: 404 });
    }


    // calculate initial habit strength:
    const initial_habit_strength = Number((discipline_willpower + resources_available + tried_before + quit_or_create + frequency_everyday) / 5).toFixed(2);

    const { is_active, is_start_date_valid, errorResp } = await validateDates(habit_start_date);
    if (!is_start_date_valid) {
      return NextResponse.json({ error: errorResp }, { status: 404 })
    }
    const create_new_habit = {
      user_id,
      habit_name,
      habit_description,
      habit_start_date,
      discipline_willpower,
      resources_available,
      tried_before,
      frequency_everyday,
      quit_or_create,
      initial_habit_strength,
      current_habit_strength: initial_habit_strength,
      expected_habit_strength: initial_habit_strength,
      average_habit_strength: initial_habit_strength,
      category,
      is_habit_active: is_active,
    }
    const new_habit = await Habit.create(create_new_habit);
    if (!new_habit) {
      return NextResponse.json({ error: `oops something went wrong while creating the habit, try again` }, { status: 500 })
    }

    // create a default tracker for the habit
    let default_tracker = {
      habit_id: new_habit._id,
      user_id,
      habit_tracker_status: 'Pending',
      habit_tracker_notes: 'system generated tracker',
      habit_tracker_daily_strength: initial_habit_strength,
      habit_tracker_expected_strength: initial_habit_strength,
      habit_tracker_logged_at: habit_start_date,
      is_habit_tracker_updated: false,
      is_default_tracker: true
    }

    const new_default_tracker = await HabitTracker.create(default_tracker);
    return NextResponse.json({ message: `habit - ${new_habit.habit_name} and a tracker - ${new_default_tracker._id} for it created successfully`, data: new_habit }, { status: 201 })
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
};
