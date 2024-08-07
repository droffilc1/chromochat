"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { TbArrowBackUp } from "react-icons/tb";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import ProfileDrawer from "./ProfileDrawer";
import GroupAvatar from "@/app/components/GroupAvatar";
import useActiveList from "@/app/hooks/useActiveList";

interface HeaderProps {
    conversation: Conversation & {
        users: User[];
    }
};

const Header: React.FC<HeaderProps> = ({ conversation }) => {
    const otherUser = useOtherUser(conversation);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { members } = useActiveList();
    const isOnline = members.indexOf(otherUser?.email!) !== -1;

    const textStatus = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`;
        }

        return isOnline ? 'Online' : 'Offline';
    }, [conversation, isOnline]);
    
    return (
        <>
            <ProfileDrawer
                data={conversation}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <div className="flex items-center justify-between py-3 px-4 lg:px-6 sm:px-4 shadow-sm w-full bg-fourthColor border-b-[1px]">
                <div className="flex gap-3 items-center">
                    <Link
                        className="lg:hidden block text-secondColor hover:text-firstColor transition cursor-pointer" 
                        href="/conversations"
                    >
                        <TbArrowBackUp size={28}/>
                    </Link>
                    {conversation.isGroup ? (
                        <GroupAvatar users={conversation.users}/>
                    ) : (
                        <Avatar user={otherUser} />
                    )}
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
                    onClick={() => setDrawerOpen(true)}
                    className="text-secondColor cursor-pointer hover:text-firstColor transition"/>
            </div>
        </>
    )
}

export default Header;
