const { PrismaClient } = require('../prisma-gst1/generated');

const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

const prisma = new PrismaClient();
dotenv.config({ path: process.env.NODE_ENV === "production" ? ".env.production" : ".env" });

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const user = await prisma.user.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      password: hashedPassword,
    },
  });

  console.log('GST1 user created:', user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
