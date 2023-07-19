import { db } from "@/server/db/db.config";
import { NextResponse } from "next/server";
import { User } from "@/server/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await db;
    const body = await req.json();
    const result = await User.findOne({ username: body.username });
    if (!result) throw new Error("User not Found!");
    const bcryptedPassword = await bcrypt.compare(
      body.password,
      result.password
    );
    if (bcryptedPassword) {
      return NextResponse.json({ success: true, result }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, result }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, data: `${error}` },
      { status: 400 }
    );
  }
}
