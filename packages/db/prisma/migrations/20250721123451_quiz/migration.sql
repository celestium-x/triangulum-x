-- CreateEnum
CREATE TYPE "Template" AS ENUM ('CLASSIC', 'MODERN', 'PASTEL', 'NEON', 'YELLOW', 'GREEN', 'BLUE');

-- AlterTable
ALTER TABLE "quizzes" ADD COLUMN     "theme" "Template" NOT NULL DEFAULT 'CLASSIC';
