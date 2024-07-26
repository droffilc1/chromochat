"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import Modal from "@/app/components/Modal";
import { User } from "@prisma/client";
import axios from "axios";
import { set } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValue, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface GroupChatProps {
    users: User[];
    isOpen: boolean;
    onClose: () => void;
}

const GroupChat: React.FC<GroupChatProps> = ({ users, isOpen, onClose }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            members: [],
        },
    });

    const members = watch("members");

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post("/api/conversations", {
            ...data,
            isGroup: true,
        })
        .then(() => {
            router.refresh();
            onClose();
        })
        .catch(() => toast.error("GROUP CHAT ERROR"))
        .finally(() => setIsLoading(false));
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-neutral-900 border-opacity-10 pb-12">
                        <h2 className="text-base font-semibold text-neutral-900 leading-7">Create Group Chat</h2>
                        <p className="mt-1 text-sm leading-6 text-neutral-700">Start chatting with more people</p>
                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input
                                register={register}
                                label="Group Name"
                                id="name"
                                disabled={isLoading}
                                required
                                errors={errors}
                            />
                            <Select
                                disabled={isLoading}
                                label="Members"
                                options={users.map((user) => ({ label: user.name, value: user.id }))}
                                onChange={(value) => setValue("members", value, { shouldValidate: true })}
                                value={members}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button
                        disabled={isLoading}
                        onClick={onClose}
                        type="button"
                        secondary
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isLoading}
                        type="submit"
                    >
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default GroupChat;
