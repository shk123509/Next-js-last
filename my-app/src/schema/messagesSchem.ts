import { z } from 'zod';

export const messageSchema = z.object(
    {
        content : z.string()
            .min(2, {message:"Minimu 2 word is reuired"})
            .max(300, {message : "MAX 300 only"})
        
    }
)