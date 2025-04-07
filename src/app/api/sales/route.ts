import { NextResponse } from "next/server";
import { getDb } from "lib/db";

export async function GET(req: Request) {
    const rawAccount = req.headers.get("gst-account")?.toLowerCase();
    const gstAccount = rawAccount === "gst1" || rawAccount === "gst2" ? rawAccount : "gst1";
    
    const db = getDb(gstAccount);

  const sales = await db.sale.findMany();
  return NextResponse.json(sales);
}

export async function POST(req: Request) {
  const { customer, quantity, salePrice, paymentStatus, gstAccount } = await req.json();
  const db = getDb(gstAccount);

  const total = quantity * salePrice;
  const newSale = await db.sale.create({ data: { customer, quantity, salePrice, total, paymentStatus } });
  return NextResponse.json(newSale);
}
