import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { auth } from "@/auth";
import { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();

  const session = await auth();

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Not Authorized" },
      { status: 401 }
    );
  }

  const user = session.user as User;
  const userId = user.id;

  try {
    const { acceptMessages } = await request.json(); // ✅ FIX

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          isAcceptingMessages: acceptMessages, // ✅ SAME FIELD
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Status updated successfully",
        isAcceptingMessages: updatedUser.isAcceptingMessages,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
