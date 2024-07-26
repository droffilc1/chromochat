"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MdAddPhotoAlternate } from "react-icons/md";
import MessageInput from "./MessageInput";
import { IoSend } from "react-icons/io5";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
    const { conversationId } = useConversation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true });
        axios.post('/api/messages', {
            ...data,
            conversationId
        });
    };

    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        });
    };

    return (
        <div className="
            py-4
            px-5
            bg-thirdColor
            border-t-[2px]
            flex
            items-center
            gap-2
            lg:gap-4
            w-full
        ">
            <CldUploadButton 
                options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset="n87jfede"
            >
                <MdAddPhotoAlternate size={30} className="text-secondColor hover:text-firstColor cursor-pointer"/>
            </CldUploadButton>
            <form onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 lg:gap-4 w-full">
                <MessageInput 
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Type a message"
                />
                <button
                    type="submit"
                    className="
                        rounded-full
                        p-2
                        bg-secondColor
                        cursor-pointer
                        hover:bg-firstColor
                        transition
                    "
                >
                    <IoSend size={16} className="text-white"/>
                </button>
            </form>
        </div>
    )
}

export default Form;
