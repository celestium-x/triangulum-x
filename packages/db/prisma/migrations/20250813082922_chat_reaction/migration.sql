/*
  Warnings:

  - You are about to drop the column `userId` on the `ChatReaction` table. All the data in the column will be lost.
  - Added the required column `reactorAvatar` to the `ChatReaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reactorName` to the `ChatReaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reactorType` to the `ChatReaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatReaction" DROP COLUMN "userId",
ADD COLUMN     "reactorAvatar" TEXT NOT NULL,
ADD COLUMN     "reactorName" TEXT NOT NULL,
ADD COLUMN     "reactorType" TEXT NOT NULL;
