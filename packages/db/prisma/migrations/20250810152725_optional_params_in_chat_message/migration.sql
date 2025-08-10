-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_repliedToId_fkey";

-- AlterTable
ALTER TABLE "ChatMessage" ALTER COLUMN "repliedToId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_repliedToId_fkey" FOREIGN KEY ("repliedToId") REFERENCES "ChatMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
