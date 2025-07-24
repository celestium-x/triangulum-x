-- CreateEnum
CREATE TYPE "Interactions" AS ENUM ('THUMBS_UP', 'DOLLAR', 'BULB', 'HEART', 'SMILE');

-- AlterTable
ALTER TABLE "quizzes" ADD COLUMN     "autoSave" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "interactions" "Interactions"[],
ADD COLUMN     "liveChat" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "spectatorMode" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "participants" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "avatar" TEXT,
    "ipAddress" TEXT,
    "isEliminated" BOOLEAN NOT NULL DEFAULT false,
    "eliminatedAt" TIMESTAMP(3),
    "eliminatedAtQuestion" TEXT,
    "finalRank" INTEGER,
    "totalScore" INTEGER NOT NULL DEFAULT 0,
    "correctAnswers" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "walletAddress" TEXT,
    "quizId" TEXT NOT NULL,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spectators" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "avatar" TEXT,
    "ipAddress" TEXT,
    "connectionId" TEXT,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quizId" TEXT NOT NULL,

    CONSTRAINT "spectators_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spectators" ADD CONSTRAINT "spectators_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
