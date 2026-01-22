import { z } from 'zod';

export const AcceptMessageSchema = z.object(
    {
        acceptedMessage : z.boolean()
    }
)