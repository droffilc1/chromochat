"use client";

import clsx from "clsx";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";
import { Conversation, Message, User } from "@prisma/client";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/components/Avatar";

interface ConversationBoxProps {
    data: FullConversationType;
    selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({ data, selected }) => {
    const otherUser = useOtherUser(data);
    const session = useSession();
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    }, [data.id, router]);

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];
        return messages[messages.length - 1];
    }, [data.messages]);

    const userEmail = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email]);

    const isSeen = useMemo(() => {
        if (!lastMessage || !userEmail) return false;

        const seenArray = lastMessage.seen || [];

        return seenArray.filter((user) => user.email === userEmail).length > 0;
    }, [lastMessage, userEmail]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) return 'Image';

        if (lastMessage?.body) return lastMessage.body;

        return 'Start Chatting';
    }, [lastMessage]);

    return (
        <div
            onClick={handleClick}
            className={clsx(`
                w-full
                relative
                flex
                items-center
                space-x-4
                p-2
                hover:bg-thirdColor
                rounded-lg
                transition
                cursor-pointer
            `, selected ? 'bg-thirdColor' : 'bg-fourthColor')}
        >
            <Avatar user={otherUser} />
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium text-neutral-900">
                            {data.name || otherUser?.name}
                        </p>
                        {lastMessage?.createdAt && (
                            <p className="text-xs font-light text-neutral-600">
                                {format(new Date(lastMessage?.createdAt), 'HH:mm')}
                            </p>
                        )}
                    </div>
                    <p className={clsx(`
                        text-xs
                        truncate
                        `, isSeen ? 'text-neutral-600' : 'text-neutral-800 font-medium'
                    )}>
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ConversationBox;
