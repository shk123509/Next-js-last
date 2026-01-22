import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect";


export async function POST(request: Request) {
    await dbConnect()
    const { messageId } = await request.json();

    try {
        if (!messageId) {
            return Response.json({
                success: false,
                message: "Message id is required fields."
            },
                {
                    status: 401
                })
        }

        const findAndDelete = await UserModel.findOneAndDelete(messageId);

        if (!findAndDelete) {
            return Response.json({
                success: false,
                message: "Message id is not find."
            },
                {
                    status: 401
                })
        }

        return Response.json({
            success: true,
            message: "Message id delete successfully"
        },
            {
                status: 200
            })


    } catch (error: any) {
        return Response.json({
            success: false,
            message: "Somting went wrong when deleting messages."
        },
            {
                status: 401
            })
    }

}    