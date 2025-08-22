import { useLiveParticipantsStore } from '@/store/live-quiz/useLiveParticipantsStore';
import { useLiveQuizGlobalChatStore } from '@/store/live-quiz/useLiveQuizGlobalChatStore';
import { useLiveQuizStore } from '@/store/live-quiz/useLiveQuizStore';
import {
    useLiveParticipantStore,
    useLiveSpectatorStore,
} from '@/store/live-quiz/useLiveQuizUserStore';
import { useLiveSpectatorsStore } from '@/store/live-quiz/useLiveSpectatorsStore';
import {
    GameSessionType,
    HostScreenEnum,
    ParticipantScreenEnum,
    ParticipantType,
    QuizPhaseEnum,
    SpectatorScreenEnum,
    SpectatorType,
} from '@/types/prisma-types';
import { ChatMessageType, ChatReactionType } from '@/types/web-socket-types';
import { toast } from 'sonner';

export class SubscribeEventHandlers {
    // <---------------------- PARTICIPANT-EVENTS ---------------------->

    static handleIncomingMessage(payload: unknown) {
        const { upsertParticipant } = useLiveParticipantsStore.getState();
        upsertParticipant(payload as ParticipantType);
    }

    static handleIncomingNameChangeMessage(payload: unknown) {
        const { upsertParticipant } = useLiveParticipantsStore.getState();
        const { updateParticipantData } = useLiveParticipantStore.getState();

        const message = payload as ParticipantType;
        upsertParticipant({
            id: message.id,
            nickname: message.nickname,
            isNameChanged: true,
        } as ParticipantType);
        updateParticipantData({
            id: message.id,
            nickname: message.nickname,
            isNameChanged: true,
        } as ParticipantType);
    }

    // <---------------------- GAME-SESSION-EVENTS ---------------------->

    static handleIncomingQuestionPreviewPageChange(payload: unknown) {
        const message = payload as {
            id: string;
            screen: SpectatorScreenEnum | ParticipantScreenEnum;
        };

        toast.success('Quiz started!');

        const { updateGameSession } = useLiveQuizStore.getState();
        updateGameSession({
            id: message.id,
            hostScreen: HostScreenEnum.QUESTION_PREVIEW,
            spectatorScreen: message.screen,
            participantScreen: message.screen,
        } as GameSessionType);
    }

    // <---------------------- SPECTATOR-EVENTS ---------------------->

    static handleSpectatorNameChangeMessage(payload: unknown) {
        const { upsertSpectator } = useLiveSpectatorsStore.getState();
        const { updateSpectatorData } = useLiveSpectatorStore.getState();
        const message = payload as SpectatorType;

        upsertSpectator({
            id: message.id,
            nickname: message.nickname,
            isNameChanged: true,
        } as SpectatorType);
        updateSpectatorData({
            id: message.id,
            nickname: message.nickname,
            isNameChanged: true,
        } as SpectatorType);
    }

    static handleIncomingNewSpectator(payload: unknown) {
        const { upsertSpectator } = useLiveSpectatorsStore.getState();
        upsertSpectator(payload as SpectatorType);
    }

    // <---------------------- CHAT-EVENTS ---------------------->

    static handleIncomingChatReactionMessage(payload: unknown) {
        const { addChatReaction } = useLiveQuizGlobalChatStore.getState();
        const message = payload as ChatReactionType;

        addChatReaction(message);
    }

    static handleIncomingChatMessage(payload: unknown) {
        const { spectatorData } = useLiveSpectatorStore.getState();
        const { addChatMessage } = useLiveQuizGlobalChatStore.getState();
        const messagePayload = payload as { id: string; payload: ChatMessageType };
        const chat = messagePayload.payload;

        if (chat.senderId === spectatorData?.id) return;

        addChatMessage(chat);
    }

    static handleIncomingReactionEvent(payload: unknown) {
        const { spectatorData } = useLiveSpectatorStore.getState();
        const { addChatReaction } = useLiveQuizGlobalChatStore.getState();

        const reactionPayload = payload as { id: string; payload: ChatReactionType };
        const reaction = reactionPayload.payload;
        if (
            reaction.reactorName === spectatorData?.nickname &&
            reaction.reactorType === 'SPECTATOR'
        )
            return;
        addChatReaction(reaction);
    }

    // <---------------------- HOST-PHASE-EVENTS ---------------------->

    static handleHostIncomingReadingPhase(payload: unknown) {
        const readingPhasePayload = payload as {
            currentQuestionIndex: number;
            currentQuestionId: string;
            questionTitle: string;
            startTime: number;
            endTime: number;
            currentPhase: QuizPhaseEnum;
            hostScreen: HostScreenEnum;
        };

        useLiveQuizStore.getState().updateGameSession({
            hostScreen: readingPhasePayload.hostScreen,
            currentQuestionId: readingPhasePayload.currentQuestionId,
            currentQuestionIndex: readingPhasePayload.currentQuestionIndex,
            phaseStartTime: readingPhasePayload.startTime,
            phaseEndTime: readingPhasePayload.endTime,
        });
    }

    static handleHostIncomingActivePhase(payload: unknown) {
        const activePhasePayload = payload as {
            questionOptions: string[];
            hostScreen: HostScreenEnum;
            startTime: number;
            endTime: number;
        };

        useLiveQuizStore.getState().updateGameSession({
            hostScreen: activePhasePayload.hostScreen,
            phaseStartTime: activePhasePayload.startTime,
            phaseEndTime: activePhasePayload.endTime,
        });

        useLiveQuizStore.getState().updateCurrentQuestion({
            options: activePhasePayload.questionOptions,
        });
    }

    static handleHostIncomingResultsPhase(payload: unknown) {
        const resultsPhasePayload = payload as {
            scores: { participantId: string; score: number }[];
            correctAnswer: number;
            hostScreen: HostScreenEnum;
            startTime: number;
        };

        useLiveQuizStore.getState().updateGameSession({
            hostScreen: resultsPhasePayload.hostScreen,
        });
    }

    // <---------------------- PARTICIPANT-PHASE-EVENTS ---------------------->

    static handleParticipantIncomingReadingPhase(payload: unknown) {
        const readingPhasePayload = payload as {
            currentQuestionIndex: number;
            currentQuestionId: string;
            questionTitle: string;
            startTime: number;
            endTime: number;
            currentPhase: QuizPhaseEnum;
            participantScreen: ParticipantScreenEnum;
        };

        useLiveQuizStore.getState().updateGameSession({
            participantScreen: readingPhasePayload.participantScreen,
            currentQuestionId: readingPhasePayload.currentQuestionId,
            currentQuestionIndex: readingPhasePayload.currentQuestionIndex,
            phaseStartTime: readingPhasePayload.startTime,
            phaseEndTime: readingPhasePayload.endTime,
        });
    }

    static handleParticipantIncomingActivePhase(payload: unknown) {
        const activePhasePayload = payload as {
            questionOptions: string[];
            pariticipantScreen: ParticipantScreenEnum;
            startTime: number;
            endTime: number;
        };

        useLiveQuizStore.getState().updateGameSession({
            participantScreen: activePhasePayload.pariticipantScreen,
            phaseStartTime: activePhasePayload.startTime,
            phaseEndTime: activePhasePayload.endTime,
        });

        useLiveQuizStore.getState().updateCurrentQuestion({
            options: activePhasePayload.questionOptions,
        });
    }

    static handleParticipantIncomingResultsPhase(payload: unknown) {
        const resultsPhasePayload = payload as {
            scores: { participantId: string; score: number }[];
            correctAnswer: number;
            participantScreen: ParticipantScreenEnum;
            startTime: number;
        };

        useLiveQuizStore.getState().updateGameSession({
            participantScreen: resultsPhasePayload.participantScreen,
        });
    }

    static handleHostLaunchQuestion() {}
}
