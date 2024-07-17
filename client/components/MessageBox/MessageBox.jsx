import { Box, Stack, Typography } from "@mui/material";
<<<<<<<< HEAD:client/app/app/home/components/MessageBox/MessageBox.jsx
import "./style.scss";
========
import "../../styles/message-box.scss";
>>>>>>>> cf4227531bbc57ad5afef2c1dcc7bf21921fa79a:client/components/MessageBox/MessageBox.jsx

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
