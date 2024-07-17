import {
    Box,
    Stack,
    Typography,
    AiOutlineUsergroupAdd,
    UserDiscussionCard,
    AdvIconButton,
    IoFilterOutline,
} from "./";
import './style.scss'

export function ConversationsSection() {
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
                <Stack gap="24px" id="stacker-discussions">
                    {Array.from({ length: 40 }, (_, index) => (
                        <UserDiscussionCard key={index} />
                    ))}
                </Stack>
            </Box>
        </Box>
    );
}
