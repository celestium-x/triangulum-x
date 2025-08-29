import { ParticipantType, ResponseType } from '@/types/prisma-types';
import { create } from 'zustand';

interface LiveParticipantsStoreProps {
    participants: ParticipantType[];
    setParticipants: (participants: ParticipantType[]) => void;
    upsertParticipant: (participant: ParticipantType) => void;
    removeParticipant: (participantId: string) => void;
    getParticipant: (participantId: string) => ParticipantType | undefined;
    updateParticipants: (participants: Partial<ParticipantType>[]) => void;

    responses: Partial<ResponseType>[];
    getResponse: (participantId: string) => Partial<ResponseType> | undefined;
    setResponses: (responses: Partial<ResponseType>[]) => void;
    updateResponses: (responses: Partial<ResponseType>[]) => void;
}

export const useLiveParticipantsStore = create<LiveParticipantsStoreProps>((set, get) => ({
    participants: [],

    setParticipants: (participantsData: ParticipantType[]) => {
        set({
            participants: participantsData,
        });
    },

    upsertParticipant: (participant: ParticipantType) => {
        set((state) => {
            const existingIndex = state.participants.findIndex((p) => p.id === participant.id);
            if (existingIndex !== -1) {
                const updatedParticipants = [...state.participants];
                const existingParticipant = updatedParticipants[existingIndex];
                if (existingParticipant) {
                    updatedParticipants[existingIndex] = {
                        ...existingParticipant,
                        ...participant,
                        id: existingParticipant.id,
                    };
                }
                return { participants: updatedParticipants };
            } else {
                return { participants: [...state.participants, participant] };
            }
        });
    },

    // Helper method to remove a participant
    removeParticipant: (participantId: string) => {
        set((state) => ({
            participants: state.participants.filter((p) => p.id !== participantId),
        }));
    },

    // Helper method to get a specific participant
    getParticipant: (participantId: string) => {
        return get().participants.find((p) => p.id === participantId);
    },

    updateParticipants: (participants: Partial<ParticipantType>[]) => {
        set((state) => {
            const updated_participant = state.participants.map((p) => {
                const incoming = participants.find((up) => up.id === p.id);
                if (incoming) {
                    return {
                        ...p,
                        ...incoming,
                        id: p.id,
                    };
                }
                return p;
            });
            return { participants: updated_participant };
        });
    },

    responses: [],

    getResponse: (participantId: string) => {

        console.log("participantId: ", participantId);

        const data = get().responses.find((r) => r.participantId === participantId);
        console.log("all responses: ", get().responses);
        console.log("found response: ", data);
        return data;
    },

    setResponses: (responses: Partial<ResponseType>[]) => {
        set({
            responses: responses
        })
    },

    updateResponses: (responses: Partial<ResponseType>[]) => {
        set((state) => {
            const updated_responses = state.responses.map((r) => {
                const incoming = responses.find((up) => up.id === r.id);
                if (incoming) {
                    return {
                        ...r,
                        ...incoming,
                        id: r.id,
                    };
                }
                return r;
            });
            return { responses: updated_responses };
        })
    }

}));
