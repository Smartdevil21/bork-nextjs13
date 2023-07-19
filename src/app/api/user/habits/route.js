import { db } from "@/server/db/db.config";
import { NextResponse } from "next/server";
import { Habit } from "@/server/models/Habit";

export async function POST(req) {
  try {
    await db;
    const body = await req.json();
    const result = await Habit.find({ user_id: body.user_id });
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, data: `${error}` },
      { status: 400 }
    );
  }
}
