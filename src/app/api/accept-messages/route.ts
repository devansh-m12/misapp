import {authOptions} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

// POST method to update user's message status
export async function POST (req: Request, res: Response){

    await dbConnect();
    
    const session = await getServerSession(authOptions);

    const user :User = session?.user;

    // Check if user is logged in
    if(!session || !session?.user){
        return Response.json({
            success: false,
            message: "You are not logged in",
        }, {status: 401});
    }

    const {acceptMessages} = await req.json();

    try{
        // Update user's message status
        const updatedUser = await UserModel.findByIdAndUpdate(user._id, {isAcceptingMessages: acceptMessages}, {new: true});
        if(!updatedUser){
            return Response.json({
                success: false,
                message: "Failed to update user status to accept messages",
            }, {status: 401});
        }
        return Response.json({
            success: true,
            message: "Message status updated successfully",
            user: updatedUser,
        }, {status: 200});
    }catch(error){
        console.log("Error updating user status to accept messages :: ", error);
        return Response.json({
            success: false,
            message: "Failed to update user status to accept messages",
        }, {status: 500});
    }

}

// GET method to fetch user's message status
export async function GET (req: Request, res: Response){

    await dbConnect();
    
    const session = await getServerSession(authOptions);

    const user :User = session?.user;

    // Check if user is logged in
    if(!session || !session?.user){
        return Response.json({
            success: false,
            message: "You are not logged in",
        }, {status: 401});
    }

    try{        
        // Fetch user's message status
        const foundUser = await UserModel.findById(user._id);

        if(!foundUser){
            return Response.json({
                success: false,
                message: "User not found",
            }, {status: 404});
        }
        return Response.json({
            success: true,
            message: "User found",
                isAcceptingMessages: foundUser.isAcceptingMessages,
            }, {status: 200});
    }catch(error){
        console.log("Error getting user status to accept messages :: ", error);
        return Response.json({
            success: false,
            message: "Failed to get user status to accept messages",
        }, {status: 500});
    }

}      
