import { validateUserSession } from "@/lib/validateUserSession";
import Habit from "@/models/Habit.model";
import HabitTracker from "@/models/HabitTracker.model";
import { NextResponse } from "next/server";

//get a habit info
export const GET = async (request, { params }) => {
 const { habit_id } = await params;
 try {
  const { isAuthenticated, session, error } = await validateUserSession();
  if (!isAuthenticated) {
   return NextResponse.json({ error: error }, { status: 401 });
  }
  const user_id = session?.user?._id;
  const fetchedHabit = await Habit.find({ _id: habit_id, user_id: user_id });
  return NextResponse.json({ message: `habit fetched successfully`, data: fetchedHabit }, { status: 201 })

 } catch (error) {
  console.error(error);
  return NextResponse.json({ error: error.message }, { status: 500 })
 }
};


// update a habit - only name, desc.
export const PATCH = async (request, { params }) => {
 const { habit_id } = await params;
 const { habit_name, habit_description, discipline_willpower, resources_available, tried_before, quit_or_create } = await request.json();
 try {
  const { isAuthenticated, session, error } = await validateUserSession();
  if (!isAuthenticated) {
   return NextResponse.json({ error: error }, { status: 401 });
  }
  const user_id = session?.user?._id;
  const fetchedHabit = await Habit.findOne({ _id: habit_id, user_id: user_id }).populate('habit_hub_id');
  if (!fetchedHabit) {
   return NextResponse.json({ error: 'habit not found or deleted' }, { status: 403 })
  }
  const initial_habit_strength = Math.ceil((discipline_willpower + resources_available + tried_before + quit_or_create) / 4)
  if (discipline_willpower || resources_available || tried_before || quit_or_create) {

  }
  const update_habit = await Habit.findOneAndUpdate({ _id: habit_id }, { habit_name, habit_description, discipline_willpower, resources_available, tried_before, quit_or_create, initial_habit_strength, average_habit_strength: initial_habit_strength, expected_habit_strength: initial_habit_strength }, { new: true });

  return NextResponse.json({ response: update_habit }, { status: 201 })
 } catch (error) {
  console.error(error);
  return NextResponse.json({ error: error }, { status: 500 })
 }
};

// delete a habit
export const DELETE = async (request, { params }) => {
 const { habit_id } = await params;
 try {
  const { isAuthenticated, session, error } = await validateUserSession();
  if (!isAuthenticated) {
   return NextResponse.json({ error: error }, { status: 401 });
  }
  const user_id = session?.user?._id;
  const fetchedHabit = await Habit.findOne({ _id: habit_id, user_id: user_id });
  if (!fetchedHabit) {
   return NextResponse.json({ error: 'habit not found or deleted' }, { status: 403 })
  }
  // delete associated trackers.
  await HabitTracker.deleteMany({ habit_id: habit_id });
  await Habit.findByIdAndDelete(habit_id);

  return NextResponse.json({ message: `habit and associalted habit trackers deleted successfully`, data: {} }, { status: 203 })
 } catch (error) {
  console.error(error);
  return NextResponse.json({ error: error }, { status: 500 })
 }
};