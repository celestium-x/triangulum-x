/*
  Warnings:

  - Changed the type of `reactorType` on the `ChatReaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ReactorType" AS ENUM ('HOST', 'SPECTATOR');

-- AlterTable
ALTER TABLE "ChatReaction" DROP COLUMN "reactorType",
ADD COLUMN     "reactorType" "ReactorType" NOT NULL;
