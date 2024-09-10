import { z } from "zod";

export const signInSchema = z.object({
    identifier: z.string().min(3, { message: "Username must be at least 3 characters" })
        .max(20, { message: "Username must be at most 20 characters" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});