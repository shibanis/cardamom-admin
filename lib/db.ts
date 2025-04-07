import { PrismaClient as PrismaClientGst1 } from "prisma-gst1/generated";
import { PrismaClient as PrismaClientGst2 } from "prisma-gst2/generated";

const globalForPrisma = globalThis as unknown as {
  prismaGst1?: PrismaClientGst1;
  prismaGst2?: PrismaClientGst2;
};

export const prismaGst1 =
  globalForPrisma.prismaGst1 ?? new PrismaClientGst1();
export const prismaGst2 =
  globalForPrisma.prismaGst2 ?? new PrismaClientGst2();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaGst1 = prismaGst1;
  globalForPrisma.prismaGst2 = prismaGst2;
}

export function getDb(gstAccount: string) {
  const normalized = gstAccount.toLowerCase();
  return normalized === "gst1" ? prismaGst1 : prismaGst2;
}
