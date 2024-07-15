import {
    Image,
    Box,
    IconButton,
    Stack,
    Typography,
    AiOutlineUsergroupAdd,
    HiLogout,
    LuUsers2,
    UserDiscussionCard,
    ChatInterface,
    Logo,
    AdvIconButton,
    IoFilterOutline,
    FaRegCommentDots,
} from "./";
import "./styles/home.scss";

export default function Home() {
    return (
        <main>
            <Box id="main-wrapper">
                <Stack direction="row" id="parts-stack-main">
                    <SideBarP1 />
                    <ContentListP2 />
                    <ChatBoxP3 />
                </Stack>
            </Box>
        </main>
    );
}

const SideBarP1 = () => {
    return (
        <Box id="part-1">
            <Stack className="stacked-p1" gap={1}>
                <Box id="logo-main">
                    <Image src={Logo} />
                </Box>

                <Stack id="icons-stacker-1" spacing={2}>
                    <AdvIconButton
                        icon={FaRegCommentDots}
                        size="small"
                        name="Messages"
                        toolTipPlacement="bottom"
                    />
                    <AdvIconButton
                        icon={LuUsers2}
                        size="small"
                        name="Friends"
                        toolTipPlacement="bottom"
                    />
                    <AdvIconButton
                        icon={HiLogout}
                        size="small"
                        name="Log out"
                        toolTipPlacement="bottom"
                    />
                </Stack>
            </Stack>
        </Box>
    );
};

const ContentListP2 = () => {
    return (
        <Box id="part-2">
            <Box id="wrapper-p2">
                <Box id="header-p2">
                    <Stack
                        direction="col"
                        id="stacker-p2"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h4" id="h4-messages">
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
                <Stack gap="23px" id="stacker-discussions">
                    {Array.from({ length: 40 }, (_, index) => (
                        <UserDiscussionCard key={index} />
                    ))}
                </Stack>
            </Box>
        </Box>
    );
};

const ChatBoxP3 = () => {
    return (
        <Box id="part-3">
            <ChatInterface />
        </Box>
    );
};
