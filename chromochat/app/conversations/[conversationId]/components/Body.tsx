"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface BodyProps {
    initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId]);

    useEffect(() => {
        pusherClient.subscribe(conversationId);
        
        bottomRef?.current?.scrollIntoView();

        const newMessageHandler = (message: FullMessageType) => {
            setMessages((current) => {
                if (find(current, { id: message.id })) {
                    return current;
                }

                return [...current, message];
            });
        };

        const updateMessageHandler = (newMessage: FullMessageType) => {
            setMessages((current) => current.map((currentMessage) => {
                if (currentMessage.id === newMessage.id) {
                    return newMessage;
                }

                return currentMessage;
            }));
        };
        
        pusherClient.bind('new-message', newMessageHandler);
        pusherClient.bind('update-message', updateMessageHandler);

        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind('new-message');
            pusherClient.unbind('update-message');
        }

    }, [conversationId]);

    return (
        <div className="flex-1 overflow-y-auto bg-thirdColor">
            {messages.map((message, i) => (
                <MessageBox
                    isLast={i === messages.length - 1}
                    key={message.id}
                    data={message}
                />
            ))}
            <div ref={bottomRef} className="pt-24" />
        </div>
    )
}

export default Body;
