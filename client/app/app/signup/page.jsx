"use client";
import {
    Box,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import "./style.scss";
import { useState } from "react";

export default function SignupPage() {
    return (
        // the sign up box
        <Container className="container">
            <Typography variant="h4" marginBottom={3} id="h4-title-main">
                {" "}
                Create your account{" "}
            </Typography>
            {/* the form */}
            <Box className="sign-up-form">
                <Stack spacing={2}>
                    {/* full-name input */}
                    <TextField
                        type="text"
                        variant="outlined"
                        label="Full name"
                        className="input-outlined-basic"
                    />
                    {/* email input */}
                    <TextField
                        type="email"
                        variant="outlined"
                        label="Email"
                        autoComplete="email"
                        className="input-outlined-basic"
                    />
                </Stack>

                {/* birth date */}
                <Box className="birth-date" marginTop={3}>
                    {/* ### */}
                    <Typography variant="h6">Birth date</Typography>
                    <Typography variant="subtitle1">
                        This information will not be displayed publicly. Confirm
                        your age, even if this account is for a business, a pet,
                        or something else.
                    </Typography>

                    {/* m/d/y */}
                    <BirthDateSelector />
                </Box>
            </Box>
        </Container>
    );
}

const BirthDateSelector = () => {
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const years = Array.from(
        { length: 101 },
        (_, i) => new Date().getFullYear() - i
    );

    return (
        <Box className="month-day-year">
            <Stack direction="horizontal" gap={2}>
                {/* Months */}
                <Box width={220}>
                    <FormControl fullWidth>
                        <InputLabel id="month-select-lbl">Month</InputLabel>
                        <Select
                            value={month}
                            labelId="month-select-lbl"
                            id="month-select"
                            label="Month"
                            onChange={(e) => setMonth(e.target.value)}
                        >
                            {months.map((m, i) => (
                                <MenuItem key={i} value={m}>
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
                            value={day}
                            labelId="day-select-lbl"
                            id="day-select"
                            label="Day"
                            onChange={(e) => setDay(e.target.value)}
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
                            value={year}
                            labelId="year-select-lbl"
                            id="year-select"
                            label="Year"
                            onChange={(e) => setYear(e.target.value)}
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
