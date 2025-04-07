const { PrismaClient } = require('../prisma-gst2/generated');

const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

const prisma = new PrismaClient();
dotenv.config({ path: process.env.NODE_ENV === "production" ? ".env.production" : ".env" });

async function main() {
  const hashedPassword = await bcrypt.hash('admin456', 10);

  const user = await prisma.user.upsert({
    where: { name: 'admin2' },
    update: {},
    create: {
      name: 'admin2',
      password: hashedPassword,
    },
  });

  console.log('GST2 user created:', user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
