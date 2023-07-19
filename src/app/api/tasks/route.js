import { Task } from "@/server/models/Task";
import { NextResponse } from "next/server";
import { db } from "@/server/db/db.config";

// To create a task
export async function POST(req) {
  try {
    await db;
    const body = await req.json();
    const result = await Task(body).save();
    return NextResponse.json({ sucess: true, data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, data: `${error}` },
      { status: 400 }
    );
  }
}

// To update a task
export async function PATCH(req) {
  try {
    await db;
    const body = await req.json();
    const result = await Task.findOneAndUpdate(
      { _id: body._id },
      { task: body.updatedTask },
      { new: true }
    );
    return NextResponse.json({ sucess: true, data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, data: `${error}` },
      { status: 400 }
    );
  }
}

// To update the status of a task
export async function PUT(req) {
  try {
    await db;
    const body = await req.json();
    const result = await Task.findOneAndUpdate(
      { _id: body.completedTask._id },
      { task: body.completedTask.task },
      { new: true }
    );
    return NextResponse.json({ sucess: true, data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, data: `${error}` },
      { status: 400 }
    );
  }
}

// To delete a task
export async function DELETE(req) {
  try {
    await db;
    const body = await req.json();
    const result = await Task.findByIdAndDelete(
      { _id: body._id },
      { new: true }
    );
    return NextResponse.json({ sucess: true, data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, data: `${error}` },
      { status: 400 }
    );
  }
}
