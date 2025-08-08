-- AlterEnum
ALTER TYPE "HostScreen" ADD VALUE 'QUESTION_READING';

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "readingTime" INTEGER NOT NULL DEFAULT 7;
