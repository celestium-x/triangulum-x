import { z } from 'zod';

export const participantJoinSchema = z.object({
    code: z.string().min(1, 'Quiz code is required'),
});
