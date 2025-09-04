// // scripts/fixCommunity.ts
// import { PrismaClient } from "@prisma/client";

// const db = new PrismaClient();

// async function main() {
//   await db.community.updateMany({
//     where: { name: "ORG" },
//     data: { name: "MARKETING" },
//   });
// }

// main()
//   .then(async () => {
//     await db.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await db.$disconnect();
//     process.exit(1);
//   });
