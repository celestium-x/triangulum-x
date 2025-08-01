-- CreateEnum
CREATE TYPE "SpectatorScreen" AS ENUM ('LOBBY', 'COUNTDOWN', 'MOTIVATION', 'QUESTION_READING', 'QUESTION_ACTIVE');

-- AlterTable
ALTER TABLE "game_sessions" ADD COLUMN     "spectatorScreen" "SpectatorScreen" NOT NULL DEFAULT 'LOBBY';
