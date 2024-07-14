"use client";
import {
    Box,
    Container,
    Icon,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import "../styles/chat-interface.scss";
import { MdOutlineEmojiSymbols } from "react-icons/md";
import { LuUnlink2 } from "react-icons/lu";
import { FaLink } from "react-icons/fa";
import { LuLink2 } from "react-icons/lu";
import { TiMicrophoneOutline } from "react-icons/ti";
import { IoMdSend } from "react-icons/io";
import MessageBox from "./MessageBox";
import InputsArea from "./InputsArea";
import { FaHashtag } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

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
        },
    ]);

    const [inputTxt, setInputTxt] = useState("");

    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);

    const sendMessage = () => {
        if (inputTxt.trim()) {
            setMessages([...messages, { id: messages.length, txt: inputTxt }]);
            setInputTxt("");
            if (inputRef.current) inputRef.current.focus();
        }
    };

    const handleChange = (e) => {
        setInputTxt(e.target.value);
    };

    const handleKeyDown = (_) => (_.key === "Enter" ? sendMessage() : null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <>
            <Box id="chat-interface">
                <DiscussionBodyDisplay
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

const DiscussionBodyDisplay = ({ messages, msgEndRef }) => {
    const randInt = getRandomInt(0, 1);
    return (
        <>
            <Box id="discussion-body">
                <Container>
                    <Box id="beginning--txt">
                        <Stack direction="row" alignItems="center" gap="3px">
                            <FaHashtag />
                            <Typography>
                                Start your first conversation with @Nezhavi
                            </Typography>
                        </Stack>
                    </Box>
                    <Stack gap={0.3}>
                        {messages.map((instance) => (
                            <MessageBox
                                boxPosition={["right", "left"][0]}
                                key={instance.id}
                            >
                                {instance.txt}
                            </MessageBox>
                        ))}
                    </Stack>
                    <Box width="100%" height="50px" ref={msgEndRef} />
                </Container>
            </Box>
        </>
    );
};
