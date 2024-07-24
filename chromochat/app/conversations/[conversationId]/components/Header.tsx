"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";

interface HeaderProps {
    conversation: Conversation & {
        users: User[];
    }
};

const Header: React.FC<HeaderProps> = ({ conversation }) => {
    const otherUser = useOtherUser(conversation);

    const textStatus = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`;
        }

        return 'Online';
    }, [conversation]);
    
    return (
        <div className="flex items-center justify-between py-3 px-4 lg:px-6 sm:px-4 shadow-sm w-full bg-fourthColor border-b-[1px]">
            <div className="flex gap-3 items-center">
                <Link
                    className="lg:hidden block text-secondColor hover:text-firstColor transition cursor-pointer" 
                    href="/conversations"
                >
                    <TbArrowBackUp size={28}/>
                </Link>
                <Avatar user={otherUser}/>
                <div className="flex flex-col">
                    <div>
                        {conversation.name || otherUser.name}
                    </div>
                    <div className="text-sm font-light text-neutral-500">
                        {textStatus}
                    </div>
                </div>
            </div>
            <IoEllipsisHorizontalSharp
                size={28} 
                onClick={() => {}}
                className="text-secondColor cursor-pointer hover:text-firstColor transition"/>
        </div>
    )
}

export default Header;
