import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
    conversationId?: string;
}

export async function DELETE(
    req: Request,
    { params }: { params: IParams }
) {
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser();
      
        if (!currentUser?.email || !currentUser?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        });

        if (!conversation) return new NextResponse("Incorrect ID", { status: 400 });

        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        });

        return NextResponse.json(deletedConversation);
    } catch (error: any) {
        console.log(error, "DELETE CONVERSATION ERROR");
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
