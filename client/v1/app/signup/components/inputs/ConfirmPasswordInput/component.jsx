import { TextField } from "@mui/material";

const InputConfirmPassword = ({ value, change, error }) => {
    return (
        <TextField
            type="password"
            variant="outlined"
            label="Confirm Password"
            name="confirmPass"
            className="input-outlined-basic"
            color="primary"
            autoComplete="current-password"
            value={value}
            onChange={change}
            error={error}
            helperText={error ? "Passwords do not match" : ""}
        />
    );
};

export default InputConfirmPassword;
