import { TextField } from "@mui/material";

/* Fullname input */
const InputFullName = ({ value, change, error }) => {
    return (
        <TextField
            type="text"
            variant="outlined"
            label="Full name"
            name="fullname"
            className="input-outlined-basic"
            color="primary"
            value={value}
            onChange={change}
            error={!!error}
            helperText={error}
        />
    );
};

export default InputFullName;
