import { Box, Stack } from "@mui/material";
import InputPassword from "../inputs/PasswordInput/component";
import InputConfirmPassword from "../inputs/ConfirmPasswordInput/component";
import PasswordCheckField from "../PasswordCheckField/component";

const PasswordField = ({ values, change, error }) => {
    return (
        <Stack spacing={3}>
            <InputPassword value={values.passwordValue} change={change} />
            <InputConfirmPassword
                value={values.confirmPasswordValue}
                change={change}
                error={error}
            />{" "}
        </Stack>
    );
};

export default PasswordField;
