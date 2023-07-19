import { db } from "@/server/db/db.config";
import { NextResponse } from "next/server";
import { Habit } from "@/server/models/Habit";

// To add new habit
export async function POST(req) {
  try {
    await db;
    const body = await req.json();
    const result = await Habit(body).save();
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, data: `${error}` },
      { status: 400 }
    );
  }
}

// For marking a habit done/missed by its id
export async function PATCH(req) {
  try {
    await db;
    const body = await req.json();
    const result = await Habit.findOneAndUpdate(
      { _id: body._id },
      { doneDates: body.doneDates }
    );
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, data: `${error}` },
      { status: 400 }
    );
  }
}

// For updating a habit
export async function PUT(req) {
  try {
    await db;
    const body = await req.json();
    const result = await Habit.findOneAndReplace({ _id: body._id }, body);
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, data: `${error}` },
      { status: 400 }
    );
  }
}

// To delete a habit
export async function DELETE(req) {
  try {
    await db;
    const body = await req.json();
    const result = await Habit.findByIdAndDelete(body.habit_id);
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, data: `${error}` },
      { status: 400 }
    );
  }
}
