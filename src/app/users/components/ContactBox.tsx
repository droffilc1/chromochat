"use client";

import Avatar from "@/app/components/Avatar";

import axios from "axios";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Load from "@/app/components/Load";

interface ContactBoxProps {
    data: User;
}

const ContactBox: React.FC<ContactBoxProps> = ({ data }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(() => {
        setIsLoading(true);
        axios.post('/api/conversations', {
            userId: data.id
        })
        .then((data) => {
            router.push(`/conversations/${data.data.id}`);
        })
        .finally(() => setIsLoading(false));
    }, [data, router]);

    return (
        <>
            {isLoading && (
                <Load />    
            )}
            <div
                onClick={handleClick}
                className="
                    w-full
                    relative
                    flex
                    items-center
                    space-x-4
                    space-y-2
                    bg-white
                    p-4
                    hover:bg-thirdColor
                    rounded-lg
                    transition
                    cursor-pointer
                "
            >
                <Avatar user={data} />
                <div className="min-w-0 flex-1">
                    <div className="focus:outline-none">
                        <div className="
                            flex
                            justify-between
                            items-center
                            mb-2
                        "
                        >
                            <p className="
                                text-sm
                                font-medium
                                text-neutral-900
                            "
                            >
                                {data.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactBox;
