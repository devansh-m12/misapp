import { resend } from "@/lib/resend";
import VerificationEmail from "@/../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string, 
    username: string, 
    otp: string
): Promise<ApiResponse> {
    try {
        resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'MisMsgs - Verify your email',
            react: VerificationEmail( {username, otp} ),
        });
        return {
            success: true,
            message: 'Verification email sent',
        };
    } catch (error) {
        console.error("Error sending verification email", error);
        return {
            success: false,
            message: 'Failed to send verification email',
        };
    }
}


