import {
    Image,
    Box,
    Stack,
    HiLogout,
    LuUsers2,
    Logo,
    AdvIconButton,
    FaRegCommentDots,
} from "./";
import "./style.scss";

export function SideBar() {
    return (
        <Box id="part-1">
            <Stack className="stacked-p1" gap={1}>
                <Box id="logo-main">
                    <Image src={Logo} />
                </Box>

                <Stack id="icons-stacker-1" spacing={2}>
                    <AdvIconButton
                        icon={FaRegCommentDots}
                        size="medium"
                        name="Messages"
                        toolTipPlacement="bottom"
                    />
                    <AdvIconButton
                        icon={LuUsers2}
                        size="medium"
                        name="Friends"
                        toolTipPlacement="bottom"
                    />
                    <AdvIconButton
                        icon={HiLogout}
                        size="medium"
                        name="Log out"
                        toolTipPlacement="bottom"
                    />
                </Stack>
            </Stack>
        </Box>
    );
}
