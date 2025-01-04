import { connectDb } from "@/lib/dbConnect";
import { validateUserSession } from "@/lib/validateUserSession";
import HabitTracker from "@/models/HabitTracker.model";
import { NextResponse } from "next/server";

//get a habit-tracker info
export const GET = async (request, { params }) => {
 const { habit_id, habit_tracker_id } = await params;
 await connectDb();
 try {
  const { isAuthenticated, session, error } = await validateUserSession();
  if (!isAuthenticated) {
   return NextResponse.json({ error: error }, { status: 401 });
  }
  const user_id = session?.user?._id;
  const habitTracker = await HabitTracker.findOne({ _id: habit_tracker_id, habit_id: habit_id, user_id: user_id });
  if (!habitTracker) {
   return NextResponse.json({ error: `habit tracker not found or deleted for the habit` }, { status: 403 })

  }
  return NextResponse.json({ message: `habit-tracker fetched successfully`, data: habitTracker }, { status: 200 })
 } catch (error) {
  console.error(error);
  return NextResponse.json({ error: error.message }, { status: 500 })
 }
};

//update a habit-tracker
export const PATCH = async (request, {params}) => {
 const { habit_id, habit_tracker_id } = await params;
 await connectDb();
 try {
  const { isAuthenticated, session, error } = await validateUserSession();
  if (!isAuthenticated) {
   return NextResponse.json({ error: error }, { status: 401 });
  }
  const user_id = session?.user?._id;
  const habitTracker = await HabitTracker.findOne({ _id: habit_tracker_id, habit_id: habit_id, user_id: user_id });
  console.log(habitTracker)
  
  if (!habitTracker) {
   return NextResponse.json({ error: `habit tracker not found or deleted for the habit` }, { status: 403 })

  }
  return NextResponse.json({ message: `updating the tracker...`, data: '' }, { status: 202 })
 } catch (error) {
  console.error(error);
  return NextResponse.json({ error: error.message }, { status: 500 })
 }
};