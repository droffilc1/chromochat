import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getContacts = async () => {
    const session = await getSession();

    if (!session?.user?.email) return [];

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where: {
                email: {
                    not: session.user.email,
                },
            },
        });

        return users;
    } catch (error: any) {
        return [];
    }
};

export default getContacts;
