"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import ConversationBox from "./ConversationBox";
import { User } from "@prisma/client";
import GroupChat from "./GroupChat";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find, updateWith } from "lodash";

interface ConversationListProps {
    initialItems: FullConversationType[];
    users: User[];
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems, users }) => {
    const session = useSession();
    const [items, setItems] = useState(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const { conversationId, isOpen } = useConversation();
    
    const pusherKey = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email]);

    useEffect(() => {
        if (!pusherKey) return;

        pusherClient.subscribe(pusherKey);

        const newHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                if (find(current, { id: conversation.id })) {
                    return current;
                }

                return [conversation, ...current];
            });
        };

        const updateHandler = (conversation: FullConversationType) => {
            setItems((current) => current.map((currentConversation) => {
                if (currentConversation.id === conversation.id) {
                    return {
                        ...currentConversation,
                        messages: conversation.messages
                    };
                }

                return currentConversation;
            }));
        };

        const deleteHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                return [...current.filter((currentConversation) => currentConversation.id !== conversation.id)];
            })

            if (conversationId === conversation.id) {
                router.push('/conversations');
            }
        };

        pusherClient.bind('new-conversation', newHandler);
        pusherClient.bind('update-conversation', updateHandler);
        pusherClient.bind('delete-conversation', deleteHandler);

        return () => {
            pusherClient.unsubscribe(pusherKey);
            pusherClient.unbind('new-conversation', newHandler);
            pusherClient.unbind('update-conversation', updateHandler);
            pusherClient.unbind('delete-conversation', deleteHandler);
        }

    }, [pusherKey, conversationId, router]);

    return (
        <>
            <GroupChat
                users={users}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <aside
                className={clsx(`
                    fixed
                    inset-y-0
                    pb-20
                    lg:pb-20
                    lg:left-20
                    lg:w-80
                    lg:block
                    overflow-y-auto
                    border-r
                    border-gray-200`,
                    isOpen ? 'hidden' : 'block w-full left-0'
                )}
            >
                <div className="px-5">
                    <div className="flex justify-between mb-4 pt-4">
                        <div className="
                            text-2xl
                            font-bold
                            text-neutral-900
                        ">
                            Messages
                        </div>
                        <div 
                            onClick={() => setIsModalOpen(true)} 
                            className="
                                rounded-full
                                p-2
                                bg-gray-200
                                text-neutral-600
                                cursor-pointer
                                hover:opacity-80
                                transition
                        ">
                            <AiOutlineUsergroupAdd size={20}/>
                        </div>
                    </div>
                    {items.map((item) => (
                        <ConversationBox key={item.id} data={item} selected={conversationId === item.id}/>
                    ))}
                </div>
            </aside>
        </>
    );
}

export default ConversationList;
