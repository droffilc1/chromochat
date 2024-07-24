import { Box, Checkbox, Stack, Typography } from "@mui/material";

const TermsCheckBox = ({ checked, change }) => {
    const label = {
        inputProps: { "aria-label": "Terms agreeing checkbox" },
        sx: {
            margin: 0.4,
            marginRight: 1.2,
            padding: 0,
            color: "#555555",
            "&.Mui-checked": {
                color: "white",
            },
        },
    };
    const handleChange = (event) => {
        change(event); // Pass the event to the parent's handleChange function
    };
    return (
        <>
            <Stack direction="row" alignItems="flex-start">
                <Box />
                <Checkbox
                    {...label}
                    size="medium"
                    color="secondary"
                    name="terms"
                    checked={checked}
                    onChange={handleChange}
                />
                <Typography variant="subtitle2" sx={{ color: "#555555" }}>
                    I agree to the Terms of Service , Privacy Policy , Cookies
                    Policy and emails sent to me for account management and
                    marketing (of which you may opt-out) purposes.
                </Typography>
            </Stack>
        </>
    );
};

export default TermsCheckBox;
