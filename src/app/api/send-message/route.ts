import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {IMessage} from "@/model/User";

export async function POST(req: Request, res: Response){

    await dbConnect();

    const {username, content} = await req.json();

    try{
        const user = await UserModel.findOne({username});
        if(!user){
            return Response.json({
                success: false,
                message: "User not found",
            }, {status: 404});  
        }

        // is user accepting messages
        if(!user.isAcceptingMessages){
            return Response.json({
                success: false,
                message: "User is not accepting messages",
            }, {status: 403});
        }

        const newMessage= {content, createdAt: new Date()};

        user.messages.push(newMessage as IMessage);

        await user.save();

        return Response.json({
            success: true,
            message: "Message sent successfully",
        }, {status: 200});
    } catch (error){
        console.log("Error sending message", error);
        return Response.json({
            success: false,
            message: "Failed to send message",
        }, {status: 500});
    }
}