import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await req.json();
        const { name, image } = body;

        if (!currentUser?.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
                data: {
                image: image,
                name: name
            },
        });

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.log(error, 'UPDATE USER ERROR');
        return new NextResponse('Error', { status: 500 });
    }
}
