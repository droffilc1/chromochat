"use client";

import Button from "@/app/components/Button";
import Modal from "@/app/components/Modal";
import useConversation from "@/app/hooks/useConversation";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { TbAlertSquareRounded } from "react-icons/tb";

interface ConfirmedModalProps {
    isOpen?: boolean;
    onClose: () => void;
}

const ConfirmedModal: React.FC<ConfirmedModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const { conversationId } = useConversation();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = useCallback(() => {
        setIsLoading(true);
        axios.delete(`/api/conversations/${conversationId}`)
        .then(() => {
            onClose();
            router.push('/conversations');
            router.refresh();
        })
        .catch(() => toast.error('Failed to delete conversation'))
        .finally(() => setIsLoading(false));
    }, [conversationId, onClose, router]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-200 sm:mx-0 sm:h-10 sm:w-10">
                    <TbAlertSquareRounded size={24} className="text-red-700"/>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base leading-6 font-semibold text-neutral-900">
                        Delete Conversation
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-neutral-700"> Deleting a conversation is irreversible. Are you sure you want to delete the conversation?</p>
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <Button
                    disabled={isLoading}
                    danger
                    onClick={handleDelete}
                >
                    Delete
                </Button>
                <Button
                    disabled={isLoading}
                    secondary
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    )
}

export default ConfirmedModal;
