import { NextResponse } from "next/server";
import { getDb } from "lib/db";

export async function GET(req: Request) {
    const rawAccount = req.headers.get("gst-account")?.toLowerCase();
    const gstAccount = rawAccount === "gst1" || rawAccount === "gst2" ? rawAccount : "gst1";
    
    const db = getDb(gstAccount);
  const stock = await db.stock.findMany();
  return NextResponse.json(stock);
}

export async function POST(req: Request) {
  const { source, grade, quantity, purchasePrice, gstAccount } = await req.json();
  const db = getDb(gstAccount);

  const newStock = await db.stock.create({ data: { source, grade, quantity, purchasePrice } });
  return NextResponse.json(newStock);
}
