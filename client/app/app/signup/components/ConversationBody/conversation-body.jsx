"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import MessageBox from "../../../home/components/MessageBox/MessageBox";
import { HiHashtag } from "react-icons/hi2";
import "./style.scss";

export default function ConversationBody({ messages, msgEndRef }) {
    return (
        <>
            <Box id="conversation-body">
                <Container>
                    <Box id="beginning--txt">
                        <Stack direction="row" alignItems="center" gap="3px">
                            <HiHashtag />
                            <Typography>
                                Start your first conversation with @Nezhavi
                            </Typography>
                        </Stack>
                    </Box>
                    <Stack gap={0.3} direction="column">
                        {messages.map((instance) => (
                            <MessageBox
                                boxPosition={instance.type}
                                key={instance.id}
                                sx={{}}
                            >
                                {instance.txt}
                            </MessageBox>
                        ))}
                        {messages.length > 0 && (
                            <Box ref={msgEndRef} height="50px" />
                        )}{" "}
                    </Stack>
                </Container>
            </Box>
        </>
    );
}
