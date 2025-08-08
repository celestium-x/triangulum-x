/*
  Warnings:

  - The values [QUESTION_ACTIVE,QUESTION_RESULTS,LEADERBOARD,FINAL_RESULTS] on the enum `HostScreen` will be removed. If these variants are still used in the database, this will fail.
  - The values [COUNTDOWN,MOTIVATION,QUESTION_READING,QUESTION_ACTIVE] on the enum `SpectatorScreen` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "HostScreen_new" AS ENUM ('LOBBY', 'QUESTION_PREVIEW');
ALTER TABLE "game_sessions" ALTER COLUMN "hostScreen" DROP DEFAULT;
ALTER TABLE "game_sessions" ALTER COLUMN "hostScreen" TYPE "HostScreen_new" USING ("hostScreen"::text::"HostScreen_new");
ALTER TYPE "HostScreen" RENAME TO "HostScreen_old";
ALTER TYPE "HostScreen_new" RENAME TO "HostScreen";
DROP TYPE "HostScreen_old";
ALTER TABLE "game_sessions" ALTER COLUMN "hostScreen" SET DEFAULT 'LOBBY';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SpectatorScreen_new" AS ENUM ('LOBBY', 'QUESTION_PREVIEW');
ALTER TABLE "game_sessions" ALTER COLUMN "spectatorScreen" DROP DEFAULT;
ALTER TABLE "game_sessions" ALTER COLUMN "spectatorScreen" TYPE "SpectatorScreen_new" USING ("spectatorScreen"::text::"SpectatorScreen_new");
ALTER TYPE "SpectatorScreen" RENAME TO "SpectatorScreen_old";
ALTER TYPE "SpectatorScreen_new" RENAME TO "SpectatorScreen";
DROP TYPE "SpectatorScreen_old";
ALTER TABLE "game_sessions" ALTER COLUMN "spectatorScreen" SET DEFAULT 'LOBBY';
COMMIT;

-- AlterTable
ALTER TABLE "participants" ADD COLUMN     "warningCount" INTEGER NOT NULL DEFAULT 0;
