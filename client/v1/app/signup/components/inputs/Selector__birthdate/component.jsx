import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
} from "@mui/material";
import { months, days, years } from "./constants";

/* Birthdate Selector */
const BirthDateSelector = ({ monthValue, dayValue, yearValue, onChange }) => {
    const handleChange = (e) => {
        onChange(e);
    };

    return (
        <Box className="month-day-year">
            <Stack direction="horizontal" gap={2}>
                {/* Months */}
                <Box width={220}>
                    <FormControl fullWidth color="primary">
                        <InputLabel id="month-select-lbl">Month</InputLabel>
                        <Select
                            value={monthValue}
                            labelId="month-select-lbl"
                            id="month-select"
                            label="Month"
                            onChange={handleChange}
                            name="bdMonth"
                        >
                            {months.map((m, i) => (
                                <MenuItem key={i} value={m} color="secondary">
                                    {m}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* Days */}
                <Box width={100}>
                    <FormControl fullWidth>
                        <InputLabel id="month-select-lbl">Day</InputLabel>
                        <Select
                            value={dayValue}
                            labelId="day-select-lbl"
                            id="day-select"
                            label="Day"
                            onChange={handleChange}
                            name="bdDay"
                        >
                            {days.map((m, i) => (
                                <MenuItem key={i} value={m}>
                                    {m}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* Years */}
                <Box width={100}>
                    <FormControl fullWidth>
                        <InputLabel id="month-select-lbl">Year</InputLabel>
                        <Select
                            value={yearValue}
                            labelId="year-select-lbl"
                            id="year-select"
                            label="Year"
                            onChange={handleChange}
                            name="bdYear"
                        >
                            {years.map((m, i) => (
                                <MenuItem key={i} value={m}>
                                    {m}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Stack>
        </Box>
    );
};

export default BirthDateSelector;
