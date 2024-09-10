import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import  UserModel  from "@/model/User";
import dbConnect from "@/lib/dbConnect";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials:any, req): Promise<any> {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                      $or: [
                        { email: credentials.identifier },
                        { username: credentials.identifier },
                      ],
                    });
                    if (!user) {
                      throw new Error('No user found with this email');
                    }
                    if (!user.isVerified) {
                      throw new Error('Please verify your account before logging in');
                    }
                    const isPasswordCorrect = await bcrypt.compare(
                      credentials.password,
                      user.password
                    );
                    if (isPasswordCorrect) {
                      return user;
                    } else {
                      throw new Error('Incorrect password');
                    }
                  } catch (err: any) {
                    throw new Error(err);
                  }
            }
        })
    ],
    pages: {
        signIn: "/sign-in",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }) {
            if(token){
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.username = token.username;
                session.user.isAcceptingMessages = token.isAcceptingMessages; 
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) { //@ts-ignore
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.username = user.username;
                token.isAcceptingMessages = user.isAcceptingMessages;
            }
            return token;
        },
    },
}