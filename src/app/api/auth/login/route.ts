import { NextResponse } from "next/server";
import { getDb } from "lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { name, password, gstAccount } = await req.json();
    const db = getDb(gstAccount);

    const user = await db.user.findUnique({ where: { name } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set");
      return NextResponse.json({ error: "Server config error" }, { status: 500 });
    }

    const token = jwt.sign({ name, gstAccount }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
