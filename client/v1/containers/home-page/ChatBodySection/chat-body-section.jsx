"use client";
import { Box } from "@mui/material";
import "./style.scss";
import InputsArea from "../../../app/home/components/InputsArea/InputsArea";
import { useEffect, useRef, useState } from "react";
import ConversationBody from "app/home/components/ConversationBody/conversation-body";
import { socket } from "socket";

function getRandomInt(min, max) {
    if (min >= max) {
        console.error("min must be less than max");
        return null;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function ChatInterface() {
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");
    const [messages, setMessages] = useState([
        {
            id: 0,
            txt: "Hey, you did not steal that, right?",
            type: "right",
        },
        {
            id: 1,
            txt: "No, I didn't",
            type: "left",
        },
        {
            id: 2,
            txt: "I tried to shot but didn't work",
            type: "left",
        },
        {
            id: 3,
            txt: "It's useless, but who cares?",
            type: "left",
        },
        {
            id: 5,
            txt: "right?",
            type: "left",
        },
    ]);

    const [inputTxt, setInputTxt] = useState("");

    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);

    const sendMessage = () => {
        if (inputTxt.trim()) {

            socket.emit("sendMessage", inputTxt);

            // setMessages([
            //     ...messages,
            //     { id: messages.length, txt: inputTxt, type: "right" },
            // ]);
            setInputTxt("");
            if (inputRef.current) inputRef.current.focus();
        }
    };

    const handleChange = (e) => {
        setInputTxt(e.target.value);
    };

    const handleKeyDown = (_) => (_.key === "Enter" ? sendMessage() : null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            block: "nearest",
            behavior: "smooth",
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        function onConnect() {
            setIsConnected(true);
            setTransport(socket.io.engine.transport.name);

            socket.io.engine.on("upgrade", (transport) => {
                setTransport(transport.name);
            });
        }

        function onDisconnect() {
            setIsConnected(false);
            setTransport("N/A");
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("sendMessage", (msg) => {
            setMessages([
                ...messages,
                { id: messages.length, txt: msg, type: "right" },
            ]);
            console.log(messages)
        });

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, []);

    return (
        <>
            <Box id="chat-interface">
                <ConversationBody
                    messages={messages}
                    msgEndRef={messagesEndRef}
                />
                <InputsArea
                    onClick={sendMessage}
                    onChange={handleChange}
                    value={inputTxt}
                    inputRef={inputRef}
                    onKeyDown={handleKeyDown}
                />
            </Box>
        </>
    );
}
