-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('TEXT', 'TEXTAREA', 'SELECT', 'MULTISELECT', 'NUMBER', 'DATE', 'BOOLEAN');

-- CreateEnum
CREATE TYPE "MembershipRole" AS ENUM ('MEMBER', 'OFFICER', 'CLIENT', 'ADMIN');

-- CreateEnum
CREATE TYPE "CommunityName" AS ENUM ('WEB', 'HACKATHON', 'AI', 'APPS', 'GAMES', 'SYSTEMS', 'ORG', 'MARKETING', 'EVENTS', 'FINANCE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'STANDARD');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userRole" "UserRole" NOT NULL DEFAULT 'STANDARD';

-- CreateTable
CREATE TABLE "Community" (
    "id" TEXT NOT NULL,
    "name" "CommunityName" NOT NULL,
    "description" TEXT,
    "visible" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Community_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityMembership" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunityMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityForm" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "communityTag" "CommunityName" NOT NULL,
    "communityId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdByName" TEXT NOT NULL DEFAULT 'Unknown',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunityForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityQuestion" (
    "id" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL,
    "options" TEXT[],
    "required" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunityQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAnswer" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "communityId" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "answeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityRole" (
    "id" TEXT NOT NULL,
    "membershipId" TEXT NOT NULL,
    "role" "MembershipRole" NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT "CommunityRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityPermissionGrant" (
    "communityId" TEXT NOT NULL,
    "role" "MembershipRole" NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "CommunityPermissionGrant_pkey" PRIMARY KEY ("communityId","role","permissionId")
);

-- CreateTable
CREATE TABLE "MembershipPermission" (
    "membershipId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "MembershipPermission_pkey" PRIMARY KEY ("membershipId","permissionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Community_name_key" ON "Community"("name");

-- CreateIndex
CREATE INDEX "CommunityForm_communityTag_idx" ON "CommunityForm"("communityTag");

-- CreateIndex
CREATE INDEX "CommunityQuestion_formId_idx" ON "CommunityQuestion"("formId");

-- CreateIndex
CREATE INDEX "UserAnswer_userId_communityId_idx" ON "UserAnswer"("userId", "communityId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAnswer_userId_questionId_key" ON "UserAnswer"("userId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "CommunityRole_membershipId_role_key" ON "CommunityRole"("membershipId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_key_key" ON "Permission"("key");

-- CreateIndex
CREATE INDEX "CommunityPermissionGrant_communityId_role_idx" ON "CommunityPermissionGrant"("communityId", "role");

-- AddForeignKey
ALTER TABLE "CommunityMembership" ADD CONSTRAINT "CommunityMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityMembership" ADD CONSTRAINT "CommunityMembership_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityForm" ADD CONSTRAINT "CommunityForm_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityForm" ADD CONSTRAINT "CommunityForm_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityQuestion" ADD CONSTRAINT "CommunityQuestion_formId_fkey" FOREIGN KEY ("formId") REFERENCES "CommunityForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityQuestion" ADD CONSTRAINT "CommunityQuestion_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "CommunityQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_formId_fkey" FOREIGN KEY ("formId") REFERENCES "CommunityForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityRole" ADD CONSTRAINT "CommunityRole_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "CommunityMembership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityPermissionGrant" ADD CONSTRAINT "CommunityPermissionGrant_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunityPermissionGrant" ADD CONSTRAINT "CommunityPermissionGrant_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembershipPermission" ADD CONSTRAINT "MembershipPermission_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "CommunityMembership"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembershipPermission" ADD CONSTRAINT "MembershipPermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
