import {authOptions} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function DELETE(
  req: Request,
  { params }: { params: { messageid: string } }
) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  const user : User = session?.user;

  if(!session || !session?.user){
      return Response.json({
          success: false,
          message: "You are not logged in",
      }, {status: 401});
  }
  const messageId = params.messageid;
  try{
      const updateResult = await UserModel.updateOne({_id: user._id}, {$pull: {messages: {_id: messageId}}});
      if(updateResult.modifiedCount === 0){
          return Response.json({
              success: false,
              message: "Failed to delete message",
          }, {status: 400});
      }
      return Response.json({
          success: true,
          message: "Message deleted successfully",
      }, {status: 200});
  } catch (error){
      console.log("Error deleting message", error);
      return Response.json({
          success: false,
          message: "Failed to delete message",
      }, {status: 500});
  }
}