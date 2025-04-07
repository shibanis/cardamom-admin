import { NextResponse } from "next/server";
import { getDb } from "lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
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

  const token = jwt.sign({ name, gstAccount }, process.env.JWT_SECRET!, { expiresIn: "1h" });

  return NextResponse.json({ token });
}
