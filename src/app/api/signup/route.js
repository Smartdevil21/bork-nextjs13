import { db } from "@/server/db/db.config";
import { NextResponse } from "next/server";
import { User } from "@/server/models/User";

export async function POST(req) {
  try {
    await db;
    const body = await req.json();
    const result = await User(body).save();
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, data: `${error}` },
      { status: 400 }
    );
  }
}
