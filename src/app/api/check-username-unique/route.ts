import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/Schema/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation,
});

export async function GET(req: Request) {
    dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const queryParams = {
            username: searchParams.get("username"),
        };
        const result = UsernameQuerySchema.safeParse(queryParams);
        if (!result.success) {
            const usernameError = result.error.format().username?._errors || [];
            return Response.json({
                success: false,
                message: usernameError?.length > 0 ? usernameError.join(", ") : "Invalid query parameters",
            }, { status: 400 });
        }
        const { username } = result.data;
        const user = await UserModel.findOne({ username, isVerified: true });
        if (user) {
            return Response.json({
                success: false,
                message: "Username is already taken",
            }, { status: 400 });
        }
        return Response.json({
            success: true,
            message: "Username is unique",
        }, { status: 200 });
    } catch (error) {
        console.log("Error in checking username unique", error);
        return Response.json({
            message: "Error in checking username unique",
            error: error,
        }, { status: 500 });
    }
}