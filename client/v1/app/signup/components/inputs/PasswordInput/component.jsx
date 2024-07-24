import { Box, TextField } from "@mui/material";
import zxcvbn from "zxcvbn";
import PasswordCheckField from "../../PasswordCheckField/component";

const InputPassword = ({ value, change }) => {
    const passwordStrength = [
        { label: "🔴" },
        { label: "🟠" },
        { label: "✅" },
        { label: "☑️" },
        { label: "✨" },
    ];

    const result = zxcvbn(value);
    const strength = passwordStrength[result.score].label;
    const color = passwordStrength[result.score].color;

    return (
        <TextField
            type="password"
            variant="outlined"
            label="Password"
            name="password"
            className="input-outlined-basic"
            color="primary"
            autoComplete="current-password"
            value={value}
            onChange={change}
            InputProps={{
                startAdornment: value && <Box fontSize={25} mr={1}>{strength}</Box>,
            }}
            helperText={
                value && (
                    <PasswordCheckField password={value} />
                )
            }
        />
    );
};

export default InputPassword;
