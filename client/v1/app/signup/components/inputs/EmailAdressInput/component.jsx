import { TextField } from "@mui/material";

/* Email input */
const InputEmail = ({ value, change, error }) => {
    return (
        <TextField
            type="email"
            name="email"
            variant="outlined"
            label="Email"
            autoComplete="email"
            className="input-outlined-basic"
            color="primary"
            value={value}
            onChange={change}
            error={!!error}
            helperText={error}
        />
    );
};

export default InputEmail;
