import { Box, Chip, FormHelperText, Stack, Typography } from "@mui/material";
import zxcvbn from "zxcvbn";

const PasswordCheckField = ({ password }) => {
    return (
        <Stack direction="row" width="100%" >
            <FormHelperText sx={{ color: "#787a7a" }}>
                Password must be at least 8 characters long, contain at least
                one uppercase letter, one lowercase letter, one number, and one
                special character.
            </FormHelperText>
        </Stack>
    );
};

export default PasswordCheckField;
