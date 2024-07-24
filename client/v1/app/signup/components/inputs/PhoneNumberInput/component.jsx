import { TextField } from "@mui/material";
import libphonenumber from "google-libphonenumber";

const PhoneNumberInput = ({ value, change, error }) => {
    return (
        <TextField
            type="text"
            variant="outlined"
            label="Phone Number"
            name="phone"
            className="input-outlined-basic"
            color="primary"
            autoComplete="tel"
            value={value}
            error={error}
            helperText={error ? "Please enter a valid phone number." : ""}
            onChange={change}
        />
    );
};

export default PhoneNumberInput;
