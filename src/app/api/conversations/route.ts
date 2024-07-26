import getCurrentUser from "@/app/actions/getCurrentUser";

import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await req.json();
        const {
            userId,
            isGroup,
            members,
            name
        } = body;

        if (!currentUser?.email || !currentUser?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (isGroup && (!name || !members || members.length < 2)) {
            return new NextResponse("Missing group details", { status: 400 });
        }

        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value
                            })),
                            {
                                id: currentUser.id
                            }
                        ]
                    },
                },
                include: {
                    users: true,
                }
            });

            newConversation.users.forEach((user) => {
                if (user.email) {
                    pusherServer.trigger(user.email, "new-conversation", newConversation)
                }
            })

            return NextResponse.json(newConversation);
        }

        const oldConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.id]
                        }
                    }
                ]
            }
        });

        const oldConversation = oldConversations[0];

        if (oldConversation) {
            return NextResponse.json(oldConversation);
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true,
            }
        });

        newConversation.users.forEach((user) => {
            if (user.email) {
                pusherServer.trigger(user.email, "new-conversation", newConversation)
            }
        })

        return NextResponse.json(newConversation);
    } catch (error: any) {
        console.log(error, "Error registering user");
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
