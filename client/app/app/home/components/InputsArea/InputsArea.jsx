import { Box, IconButton, Stack, TextField } from "@mui/material";
import { LuLink2 } from "react-icons/lu";
import { IoMdSend } from "react-icons/io";
import { MdOutlineStar } from "react-icons/md";
import './style.scss'

export default function InputsArea({
    onClick,
    onChange,
    onKeyDown,
    value,
    inputRef,
}) {
    return (
        <>
            <Box id="inputs-area">
                <Stack direction="row" id="ifc-stacker-1">
                    <Stack direction="row" gap="10px" id="ifc-stacker-2">
                        <IconButton className="icons-for">
                            <MdOutlineStar />
                        </IconButton>
                        <IconButton className="icons-for">
                            <LuLink2 />
                        </IconButton>
                    </Stack>

                    <TextField
                        variant="outlined"
                        id="message-field"
                        fullWidth
                        placeholder="Type a message"
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        InputProps={{
                            inputRef: inputRef,
                        }}
                        value={value}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    border: "none",
                                },
                                "&:hover fieldset": {
                                    border: "none",
                                },
                                "&.Mui-focused fieldset": {
                                    border: "none",
                                },
                            },
                        }}
                    />
                    <IconButton
                        className="icons-for"
                        id="send-button"
                        onClick={onClick}
                    >
                        <IoMdSend />
                    </IconButton>
                </Stack>
            </Box>
        </>
    );
}
