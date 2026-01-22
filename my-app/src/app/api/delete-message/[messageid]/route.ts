import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { auth } from "@/auth";
import { User } from 'next-auth';

export async function DELETE(request: Request, { params }: { params: { messageid: string } }) {
    
    const { messageid } = await params;
    try {
        await dbConnect();

        const session = await auth();
        const user: User = session?.user as User

        if (!session || !session.user) {
            return Response.json(
                { success: false, message: "Not authorized" },
                { status: 401 }
            );
        }
        
        if (!messageid) {
           return Response.json(
                { success: false, message: "Message id dose not found" },
                { status: 404 }
            ); 
        }



        const userId = user?.id;

        if (!userId) {
            return Response.json(
                { success: false, message: "User dose not found" },
                { status: 404 }
            );
        }

        const deleteMessage = await UserModel.updateOne(
            {
                _id: userId
            },
            {
                $pull: { messages: { _id: messageid } }
            }
        )

        if (deleteMessage.modifiedCount === 0) {
            return Response.json(
                { message: 'Message not found or already deleted', success: false },
                { status: 404 }
            );
        }

        return Response.json(
        { message: 'Message is delete successfully', success: false },
        { status: 200 }
      );

    } catch (error) {

        return Response.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
