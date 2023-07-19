import { FeedBack } from "@/server/models/Feedback";
import { db } from "@/server/db/db.config";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await db;
    const body = await req.json();
    const result = await FeedBack(req.body).save();
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, data: `${error}` },
      { status: 400 }
    );
  }
}
