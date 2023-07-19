import { Task } from "@/server/models/Task";
import { NextResponse } from "next/server";
import { db } from "@/server/db/db.config";

export async function POST(req) {
  try {
    await db;
    const body = await req.json();
    const result = await Task.find({ user_id: body.user_id });
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, data: `${error}` },
      { status: 400 }
    );
  }
}

export async function DELETE(req) {
  try {
    await db;
    const body = await req.json();
    const result = await Task.deleteMany({
      user_id: body.user_id,
      _id: { $in: body.tasksToBeDeleted },
    });
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, data: `${error}` },
      { status: 400 }
    );
  }
}
