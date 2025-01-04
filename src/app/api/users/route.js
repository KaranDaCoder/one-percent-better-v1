import { connectDb } from "@/lib/dbConnect";
import User from "@/models/User.model";
import { NextResponse } from "next/server";
import { auth } from "@/auth";


export const GET = async (request, response) => {
 try {
  const session = await auth()
  if (!session) return NextResponse.json({ error: `Not Authenticated` }, { status: 401 })
  const { user: { _id } } = session;
  const user = await User.findById(_id);


  return NextResponse.json({ response: user }, { status: 200 })
 } catch (error) {
  console.error(error);
  return NextResponse.json({ error: error }, { status: 500 })
 }
};

