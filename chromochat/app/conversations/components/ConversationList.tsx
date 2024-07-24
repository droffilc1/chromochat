"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
    initialItems: FullConversationType[];

}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems }) => {
    const [items, setItems] = useState(initialItems);
    const router = useRouter();
    const { conversationId, isOpen } = useConversation();
    
    return (
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
                    <div className="
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
    );
}

export default ConversationList;
