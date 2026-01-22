import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { auth } from "@/auth";
import { User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ messageid: string }> }
) {
  try {
    const { messageid } = await context.params;

    if (!messageid) {
      return NextResponse.json(
        { success: false, message: "Message id does not exist" },
        { status: 404 }
      );
    }

    await dbConnect();

    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: "Not authorized" },
        { status: 401 }
      );
    }

    const user: User = session.user as User;
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const deleteMessage = await UserModel.updateOne(
      { _id: userId },
      { $pull: { messages: { _id: messageid } } }
    );

    if (deleteMessage.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Message not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
