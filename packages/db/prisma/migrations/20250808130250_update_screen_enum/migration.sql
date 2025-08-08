/*
  Warnings:

  - The values [MOTIVATION] on the enum `ParticipantScreen` will be removed. If these variants are still used in the database, this will fail.
  - The values [QUESTION_PREVIEW] on the enum `SpectatorScreen` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "HostScreen" ADD VALUE 'QUESTION_ACTIVE';

-- AlterEnum
BEGIN;
CREATE TYPE "ParticipantScreen_new" AS ENUM ('LOBBY', 'COUNTDOWN', 'QUESTION_MOTIVATION', 'QUESTION_READING', 'QUESTION_ACTIVE');
ALTER TABLE "game_sessions" ALTER COLUMN "participantScreen" DROP DEFAULT;
ALTER TABLE "game_sessions" ALTER COLUMN "participantScreen" TYPE "ParticipantScreen_new" USING ("participantScreen"::text::"ParticipantScreen_new");
ALTER TYPE "ParticipantScreen" RENAME TO "ParticipantScreen_old";
ALTER TYPE "ParticipantScreen_new" RENAME TO "ParticipantScreen";
DROP TYPE "ParticipantScreen_old";
ALTER TABLE "game_sessions" ALTER COLUMN "participantScreen" SET DEFAULT 'LOBBY';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SpectatorScreen_new" AS ENUM ('LOBBY', 'QUESTION_MOTIVATION', 'QUESTION_READING', 'QUESTION_ACTIVE');
ALTER TABLE "game_sessions" ALTER COLUMN "spectatorScreen" DROP DEFAULT;
ALTER TABLE "game_sessions" ALTER COLUMN "spectatorScreen" TYPE "SpectatorScreen_new" USING ("spectatorScreen"::text::"SpectatorScreen_new");
ALTER TYPE "SpectatorScreen" RENAME TO "SpectatorScreen_old";
ALTER TYPE "SpectatorScreen_new" RENAME TO "SpectatorScreen";
DROP TYPE "SpectatorScreen_old";
ALTER TABLE "game_sessions" ALTER COLUMN "spectatorScreen" SET DEFAULT 'LOBBY';
COMMIT;
