import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(req: Request, res: Response) {
    await dbConnect();

    try {
        const { username, email, password } = await req.json();

        const existingUserVerifiedByUsername = await UserModel.findOne({ username, isVerified: true });
        if (existingUserVerifiedByUsername) {
            return Response.json(
                {
                    success: false,
                    message: "User already exists",
                },
                { status: 400 }
            );
        }
        const userbyusername = await UserModel.findOne({ username });
        const verifyCode = Math.floor(Math.random() * 900000 + 100000).toString(); 

        const existingUserVerifiedByEmail = await UserModel.findOne({ email});
        if (existingUserVerifiedByEmail) {
            if(existingUserVerifiedByEmail.isVerified) {
                return Response.json(
                    {
                        success: false,
                        message: "User already exists",
                    },
                    { status: 400 }
                );
            } else {
                if(existingUserVerifiedByEmail.email !== userbyusername?.email){
                    return Response.json(
                        {
                            success: false,
                            message: "Username already exists with different email",
                        },
                        { status: 400 }
                    );
                }
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserVerifiedByEmail.password = hashedPassword;
                existingUserVerifiedByEmail.verifyCode = verifyCode;
                existingUserVerifiedByEmail.username = username;
                existingUserVerifiedByEmail.verifyCodeExpiry = new Date(Date.now() + 1 * 60 * 1000);
                await existingUserVerifiedByEmail.save();
            }
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1);
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isAcceptingMessages: true,
                messages: [],
                isVerified: false,
            });

            await newUser.save();
        }

        const emailResponse = await sendVerificationEmail(
            email,  
            username,
            verifyCode
        );

        if (!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message,
                },
                { status: 500 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "User created successfully, please check your email for verification",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in sign-up route post", error);
        return Response.json(
            {
                success: false,
                message: "Error in sign-up route post",
            },
            { status: 500 }
        );
    }
}

