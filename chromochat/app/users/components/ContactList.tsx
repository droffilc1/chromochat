"use client";

import { User } from "@prisma/client";
import ContactBox from "./ContactBox";

interface ContactListProps {
    items: User[];
}

const ContactList: React.FC<ContactListProps> = ({
    items
}) => {
    return (
        <aside
            className="
                fixed
                inset-y-2
                pb-20
                lg:pb-20
                lg:left-20
                lg:w-80
                lg:block
                overflow-y-auto
                border-r
                border-gray-200
                block
                w-full
                left-0
            "
        >
            <div className="px-5 pb-20">
                <div className="flex-col">
                    <div className="
                        text-2xl
                        font-bold
                        text-neutral-900
                        py-4
                    ">
                        Contacts
                    </div>
                </div>
                {items.map((item) => (
                    <ContactBox key={item.id} data={item} />
                ))}
            </div>
        </aside>
    );
}

export default ContactList;
