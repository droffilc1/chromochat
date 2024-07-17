"use client";
<<<<<<<< HEAD:client/app/containers/home-page/ChatBodySection/chat-body-section.jsx
import { Box } from "@mui/material";
import "./style.scss";
import InputsArea from "@/app/home/components/InputsArea/InputsArea";
import { useEffect, useRef, useState } from "react";
import ConversationBody from "@/app/home/components/ConversationBody/conversation-body";
========
import {
    Box,
    Container,
    Hidden,
    Icon,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import "../../styles/chat-interface.scss";
import { FaHashtag } from "react-icons/fa6";
import { HiHashtag } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import MessageBox from "../MessageBox/MessageBox";
import InputArea from "../InputsArea/InputsArea";
>>>>>>>> cf4227531bbc57ad5afef2c1dcc7bf21921fa79a:client/components/ChatInterface/ChatInterface.jsx

function getRandomInt(min, max) {
    if (min >= max) {
        console.error("min must be less than max");
        return null;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function ChatInterface() {
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
            setMessages([
                ...messages,
                { id: messages.length, txt: inputTxt, type: "right" },
            ]);
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

    return (
        <>
            <Box id="chat-interface">
                <ConversationBody
                    messages={messages}
                    msgEndRef={messagesEndRef}
                />
                <InputArea
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
