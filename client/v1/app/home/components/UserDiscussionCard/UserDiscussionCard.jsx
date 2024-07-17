import { Avatar, Box, Stack, Typography } from "@mui/material";
import "./style.scss";

function UserDiscussionCard() {
    return (
        <>
            <Box id="udc-main-wrapper">
                <Stack direction="col" gap="10px" id="stacker-1">
                    <Box id="structerer-1">
                        <Avatar id="avatar_1">A</Avatar>
                    </Box>
                    <Box id="structerer-2">
                        <Stack id="stacker-2">
                            <Stack
                                id="stacker-3"
                                direction="col"
                                justifyContent="space-between"
                            >
                                <Typography variant="h6" id="profile-name">
                                    Nezhavi
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    id="sent-time"
                                    alignSelf="center"
                                >
                                    11:14
                                </Typography>
                            </Stack>
                            <Box id="latest-message">Alright, thanks!</Box>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </>
    );
}

export default UserDiscussionCard;
