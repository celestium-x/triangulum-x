import { ParticipantType } from "@/types/prisma-types";
import { create } from "zustand";

interface LiveParticipantsStoreProps {
    participants: ParticipantType[],
    setParticipants: (participants: ParticipantType[]) => void
    updateParticipant: (participantId: string, updatedFields: Partial<ParticipantType>) => void
}

export const useLiveParticipantsStore = create((set, get) => ({
    participants: [],
    setParticipants: (participantsData: ParticipantType[]) => {
        set({
            participants: participantsData
        })
    },
    updateParticipant: (participantId: string, updatedFields: Partial<ParticipantType>) => {
        set((state) => ({
            participants: state.participants.map((participant) => {
                if (participant.id === participantId) {
                    return {
                        ...participant,
                        ...updatedFields
                    }
                }
                return participant
            })
        }))
    }
}));
