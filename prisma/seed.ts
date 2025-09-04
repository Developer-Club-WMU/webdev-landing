// prisma/seed.ts
import { PrismaClient, CommunityName, QuestionType } from "@prisma/client";
const db = new PrismaClient();

// Initializes the necessary tables in the database
// to quickly start developing

/**
 * Default questions for all communities except ORG
 */
const DEFAULT_QUESTIONS: Array<{ label: string; type: QuestionType }> = [
  {
    label: "What interests you about this community?",
    type: QuestionType.TEXT,
  },
  { label: "Do you have experience in this area?", type: QuestionType.BOOLEAN },
  { label: "What do you hope to gain by joining?", type: QuestionType.TEXT },
];

const notVisibleNames: CommunityName[] = ["EVENTS", "FINANCE", "MARKETING"];

// ---- helpers
async function ensureCommunities() {
  const names = Object.values(CommunityName);
  for (const name of names) {
    await db.community.upsert({
      where: { name },
      update: {},
      create: {
        name,
        description: "Default description",
        visible: notVisibleNames.includes(name) ? false : true,
      },
    });
  }
}

async function ensureSystemUser() {
  const email = process.env.SEED_SYSTEM_EMAIL ?? "system@local";
  return db.user.upsert({
    where: { email },
    update: {},
    create: { email, name: "System", userRole: "ADMIN" },
  });
}

async function ensureFormForCommunity(opts: {
  community: { id: string; name: CommunityName };
  createdById: string;
}) {
  const { community, createdById } = opts;

  // If a form already exists for this tag, reuse it
  const existing = await db.communityForm.findFirst({
    where: { communityTag: community.name },
    orderBy: { createAt: "asc" },
  });
  if (existing) return existing;

  const title = `${community.name} Community Interest Form`;
  const description = `Form for students interested in the ${community.name} community.`;

  return db.communityForm.create({
    data: {
      title,
      description,
      communityTag: community.name,
      communityId: community.id,
      createdById,
      createdByName: "System",
      isActive: true,
    },
  });
}

async function ensureDefaultQuestions(formId: string) {
  // Create only missing labels
  const existing = await db.communityQuestion.findMany({
    where: { formId },
    select: { label: true },
  });
  const have = new Set(existing.map((e) => e.label));

  let order = 0;
  for (const q of DEFAULT_QUESTIONS) {
    if (have.has(q.label)) continue;
    await db.communityQuestion.create({
      data: {
        formId,
        label: q.label,
        type: q.type,
        order: order++,
        createdById: (await ensureSystemUser()).id, // ensure creator exists
      },
    });
  }
}

async function seedFormsPerCommunity() {
  const system = await ensureSystemUser();

  const communities = await db.community.findMany({
    where: { name: { in: Object.values(CommunityName) as CommunityName[] } },
    select: { id: true, name: true },
  });

  for (const community of communities) {
    const form = await ensureFormForCommunity({
      community,
      createdById: system.id,
    });
    await ensureDefaultQuestions(form.id);
  }
}

// // Permissions seeding if you added the tables
// async function seedPermissions() {
//   // skip for now, permissions will be added later
//   const keys = [
//     "lead.view",
//     "lead.update",
//     "community.manage.members",
//     "community.form.edit",
//     "post.create",
//   ];
//   await db.permission.createMany({
//     data: keys.map((key) => ({ key })),
//     skipDuplicates: true,
//   });

//   const org = await db.community.findUnique({ where: { name: ORG_NAME } });
//   if (!org) return;

//   const perms = await db.permission.findMany();
//   const id = (k: string) => perms.find((p) => p.key === k)!.id;

//   // ORG-wide grants
//   await db.communityPermissionGrant.createMany({
//     data: [
//       // ADMIN gets all
//       ...perms.map((p) => ({
//         communityId: org.id,
//         role: "ADMIN" as const,
//         permissionId: p.id,
//       })),
//       // MEMBER baseline
//       { communityId: org.id, role: "MEMBER", permissionId: id("lead.view") },
//       // OFFICER extras
//       { communityId: org.id, role: "OFFICER", permissionId: id("lead.view") },
//       { communityId: org.id, role: "OFFICER", permissionId: id("lead.update") },
//       {
//         communityId: org.id,
//         role: "OFFICER",
//         permissionId: id("community.manage.members"),
//       },
//     ],
//     skipDuplicates: true,
//   });
// }

async function main() {
  console.log("This is something");
  await ensureCommunities();
  await seedFormsPerCommunity();
  // await seedPermissions(); // enable if using permissions
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
