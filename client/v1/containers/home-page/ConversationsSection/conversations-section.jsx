import { Paper } from "@mui/material";
import {
    Box,
    Stack,
    Typography,
    AiOutlineUsergroupAdd,
    UserDiscussionCard,
    AdvIconButton,
    IoFilterOutline,
} from "./";
import "./style.scss";

export default function ConversationsSection() {
    return (
        <Box id="conversations-section">
            <Box id="wrapper-p2">
                <Box id="header-p2">
                    <Stack
                        direction="col"
                        id="stacker-p2"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h4" id="h4">
                            Messages
                        </Typography>
                        <Stack direction="row">
                            {" "}
                            <AdvIconButton
                                icon={AiOutlineUsergroupAdd}
                                size="large"
                                name="Add friend"
                                toolTipPlacement="bottom"
                            />
                            <AdvIconButton
                                icon={IoFilterOutline}
                                size="large"
                                name="Filter"
                                toolTipPlacement="bottom"
                            />
                        </Stack>
                    </Stack>
                </Box>
                <Box className="stack__wrapper">
                    <Stack gap="24px" id="stacker-discussions">
                        <Box className="dummy-space" />
                        {
                            /*  */
                            Array.from({ length: 60 }, (_, index) => (
                                <UserDiscussionCard key={index} width="auto" />
                            ))
                            /*  */
                        }
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}
