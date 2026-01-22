import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { auth } from "@/auth";
import { User } from 'next-auth';


export async function GET(request:Request) {
    await dbConnect()

    const session = await auth();

    const user : User = session?.user as User

    if (!session || !session?.user) {
        return Response.json(
            {
                success: false,
                message: "Not Authroized"
            },
            {
                status: 400
            }
        )
    }

    const userId = user?.id

    try {
        const findbyid = await UserModel.findById(userId)

        if (!findbyid) {
            return Response.json(
            {
                success: false,
                message: "User dose not exist."
            },
            {
                status: 400
            }
        )
        }

    

        return Response.json(
            {
                success: true,
                message: "fetched accepted messages",
                isAcceptingMessages : findbyid.isAcceptingMessages
            },
            {
                status: 200
            }
        )

    } catch (error:any) {
        return Response.json(
            {
                success: false,
                message: error.messages
            },
            {
                status: 500
            }
        )
    }
}