import { z } from 'zod';

export const spectatorJoinSchema = z.object({
    code: z.string().min(1, 'Spectator code is required'),
});
