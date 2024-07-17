import { ConversationsSection } from "@/containers/home-page/ConversationsSection/conversations-section";
import {
    Box,
    Stack,
    ChatInterface,
} from "./";
import '../../styles/globals.scss'
import "./style.scss";
import { SideBar } from "./components/SideBar/side-bar";

export default function Home() {
    return (
        <main>
            <Box id="main-wrapper">
                <Stack direction="row" id="parts-stack-main">
                    <SideBar />
                    <ConversationsSection />
                    <ChatInterface />
                </Stack>
            </Box>
        </main>
    );
}





