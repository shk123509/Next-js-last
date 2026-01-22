import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { auth } from "@/auth";
import mongoose from "mongoose";

export async function GET() {
  try {
    await dbConnect();

    const session = await auth();

    if (!session || !session.user) {
      return Response.json(
        { success: false, message: "Not authorized" },
        { status: 401 }
      );
    }

    // Convert session user id to MongoDB ObjectId
    const userId = new mongoose.Types.ObjectId(session.user.id);

   

    // Aggregate messages newest first
    const result = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } }
    ]);

    // If user not found
    if (!result || result.length === 0) {
      return Response.json(
        { success: true, messages: [] },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: true,
        messages: result[0].messages,
      },
      { status: 200 }
    );

  } catch (error) {
    
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
