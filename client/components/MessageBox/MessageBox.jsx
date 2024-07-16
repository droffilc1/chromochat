import { Box, Stack, Typography } from "@mui/material";
import "../../styles/message-box.scss";

export default function MessageBox(props) {
    return (
        <Box id={`mssg-container-instance-${props.boxPosition}`} >
            <Stack id="mssg-box">
                <Stack id="stacker-msgbox" direction="row">
                    <Typography id="message-content">
                        {props.children}
                    </Typography>
                    <Box id="extra-width_1"></Box>
                </Stack>

                <Box id="sent-time">01:11</Box>
            </Stack>
        </Box>
    );
}
