-- CreateEnum
CREATE TYPE "QuizPhase" AS ENUM ('QUESTION_READING', 'QUESTION_ACTIVE', 'SHOW_RESULTS', 'WAITING_NEXT');

-- AlterEnum
ALTER TYPE "HostScreen" ADD VALUE 'QUESTION_READING';

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "readingTime" INTEGER NOT NULL DEFAULT 7;

-- AlterTable
ALTER TABLE "game_sessions" ADD COLUMN     "currentPhase" "QuizPhase",
ADD COLUMN     "phaseEndTime" TIMESTAMP(3),
ADD COLUMN     "phaseStartTime" TIMESTAMP(3);
