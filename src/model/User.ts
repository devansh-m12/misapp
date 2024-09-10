import mongoose, { Schema,Document } from "mongoose";

export interface IMessage extends Document {
    createdAt: Date;
    updatedAt: Date;
    content: string;
}

const MessageSchema:Schema<IMessage> = new Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    content: { type: String, required: true },
});


export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isAcceptingMessages: boolean;
    messages: IMessage[];
    isVerified: boolean;
}

const UserSchema:Schema<IUser> = new Schema({
    username: { type: String, required: [true, "Username is required"] },
    email: { type: String, required: [true, "Email is required"], match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"] },
    password: { type: String, required: [true, "Password is required"] },
    verifyCode: { type: String, required: true },
    verifyCodeExpiry: { type: Date, required: true },
    isAcceptingMessages: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    messages: [MessageSchema],
});
const User = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>("User", UserSchema);
export default User;
