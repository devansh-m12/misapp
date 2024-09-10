import {z} from 'zod'

export const usernameValidation = z.string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username must contain only letters, numbers and underscores" });
    
export const emailValidation = z.string().email({ message: "Invalid email address" });

export const passwordValidation = z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must be at most 20 characters" });

export const signUpSchema = z.object({
    username: usernameValidation,
    email: emailValidation,
    password: passwordValidation,
});