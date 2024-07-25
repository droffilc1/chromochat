"use client";

import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
    data: FullMessageType;
    isLast: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
    const session = useSession();
    const [imageOpen, setImageOpen] = useState(false);
    const isMine = data?.sender?.email === session?.data?.user?.email;
    const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(', ');

    const container = clsx(
        "flex gap-3 p-4",
        isMine && "justify-end"
    )

    const avatar = clsx(isMine && "order-2");

    const body = clsx(
        "flex flex-col gap-2",
        isMine && "items-end"
    )

    const message = clsx(
        "text-sm w-fit overflow-hidden",
        isMine ? "bg-secondColor text-white" : "bg-gray-100",
        data.image ? 'rounded-md p-0' : 'rounded-full px-3 py-3'
    )

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data.sender} />
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {data.sender.name}
                    </div>
                    <div className="text-xs text-gray-500">
                        {format(new Date(data.createdAt), 'HH:mm')}
                    </div>
                </div>
                <div className={message}>
                    <ImageModal
                        src={data.image}
                        isOpen={imageOpen}
                        onClose={() => setImageOpen(false)}
                    />
                    {data.image ? (
                        <Image
                            onClick={() => setImageOpen(true)}
                            alt="Image"
                            height="240"
                            width="240"
                            src={data.image}
                            className="
                                object-cover
                                cursor-pointer
                                hover:scale-125
                                transition
                                translate
                            "
                        />
                    ) : (
                        <div>{data.body}</div>
                    )}
                </div>
                {isMine && seenList.length > 0 && (
                    <div className="text-xs font-light text-black">
                        Seen by {seenList}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MessageBox;
