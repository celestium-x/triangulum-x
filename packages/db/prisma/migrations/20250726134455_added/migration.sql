-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('WAITING', 'STARTING', 'QUESTION_ACTIVE', 'QUESTION_ENDED', 'ELIMINATING', 'COMPLETED', 'PAUSED');

-- CreateEnum
CREATE TYPE "ParticipantScreen" AS ENUM ('LOBBY', 'COUNTDOWN', 'MOTIVATION', 'QUESTION_READING', 'QUESTION_ACTIVE');

-- CreateEnum
CREATE TYPE "HostScreen" AS ENUM ('LOBBY', 'QUESTION_PREVIEW', 'QUESTION_ACTIVE', 'QUESTION_RESULTS', 'LEADERBOARD', 'FINAL_RESULTS');

-- CreateTable
CREATE TABLE "game_sessions" (
    "id" TEXT NOT NULL,
    "currentQuestionIndex" INTEGER NOT NULL DEFAULT 0,
    "currentQuestionId" TEXT,
    "status" "SessionStatus" NOT NULL DEFAULT 'WAITING',
    "hostScreen" "HostScreen" NOT NULL DEFAULT 'LOBBY',
    "participantScreen" "ParticipantScreen" NOT NULL DEFAULT 'LOBBY',
    "questionStartedAt" TIMESTAMP(3),
    "questionEndsAt" TIMESTAMP(3),
    "lastEliminationAt" INTEGER,
    "nextEliminationAt" INTEGER,
    "totalParticipants" INTEGER NOT NULL DEFAULT 0,
    "activeParticipants" INTEGER NOT NULL DEFAULT 0,
    "totalSpectators" INTEGER NOT NULL DEFAULT 0,
    "avgResponseTime" INTEGER NOT NULL DEFAULT 0,
    "correctAnswerRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "quizId" TEXT NOT NULL,

    CONSTRAINT "game_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "responses" (
    "id" TEXT NOT NULL,
    "selectedAnswer" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "timeToAnswer" INTEGER NOT NULL,
    "pointsEarned" INTEGER NOT NULL,
    "timeBonus" INTEGER NOT NULL DEFAULT 0,
    "streakBonus" INTEGER NOT NULL DEFAULT 0,
    "answeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "participantId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "gameSessionId" TEXT NOT NULL,

    CONSTRAINT "responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eliminations" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "questionIndex" INTEGER NOT NULL,
    "finalScore" INTEGER NOT NULL,
    "finalRank" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "eliminatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameSessionId" TEXT NOT NULL,

    CONSTRAINT "eliminations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "game_sessions_quizId_key" ON "game_sessions"("quizId");

-- CreateIndex
CREATE UNIQUE INDEX "responses_participantId_questionId_key" ON "responses"("participantId", "questionId");

-- AddForeignKey
ALTER TABLE "game_sessions" ADD CONSTRAINT "game_sessions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "game_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eliminations" ADD CONSTRAINT "eliminations_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "game_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
