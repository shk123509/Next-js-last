import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { Message } from '@/models/User';

export async function POST(request:Request) {
    await dbConnect();

    const{username, content} = await request.json();

    try {
        const user = await UserModel.findOne({username})

        if (!user) {
            return Response.json(
            {
                success: false,
                message: "user dose not exist",
                
            },
            {
                status: 404
            }
        )
        }

        // Chk user accepted messages.

        if (!user?.isAcceptingMessages) {
            return Response.json(
            {
                success: false,
                message: "user dose not accepted messages",
                
            },
            {
                status: 403
            }
        )
        }

        const newMessage = {content, createdAt : new Date()};

        user?.messages.push(newMessage as Message);

        await user?.save()

        return Response.json(
            {
                success: true,
                message: "Message send success"
            },
            {
                status: 200
            }
        )


    } catch (error:any) {
        return Response.json(
            {
                success : true,
                message : error.message
                
            },
            {
                status: 500
            }
        )
    }
}





