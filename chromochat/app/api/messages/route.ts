import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await req.json();
        const { message, image, conversationId } = body;

        if (!currentUser?.email || !currentUser?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const newMessage = await prisma.message.create({
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seen: {
                    connect: {
                            id: currentUser.id
                        }
                }
            },
            include: {
                sender: true,
                seen: true
            }
        });

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        });

        return NextResponse.json(newMessage);

    } catch (error: any) {
        console.error(error, 'MESSAGE POST ERROR');
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
