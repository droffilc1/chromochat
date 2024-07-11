"use client";

import {
    Box,
    Button,
    Container,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import "./style.scss";
import { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { months, days, years, textContentData } from "../data";
import { debounce } from "lodash";

export default function CreateAcountPopUp() {
    /**
     * Not really!
     * @returns SIGNUP PAGE
     */

    const [formData, set_formData] = useState({ fullname: "", email: "" });
    const [errors, set_errors] = useState({});
    //

    const validateEmail = (email) => {
        let txtErrors = {};
        let formatValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Adjusted to allow for more than .com domains

        if (email) {
            formatValid = emailRegex.test(email);

            if (!formatValid)
                txtErrors.email = "Please enter a valid email address.";
            console.log(formatValid);
        }

        set_errors(txtErrors);

        return Object.keys(txtErrors).length === 0 && formatValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };
        set_formData(updatedFormData);

        if (name === "email") {
            validateEmail(value); // Pass the current email value directly
        }
    };
    //

    const validateForm = () => {
        return (
            Object.keys(errors).length === 0 &&
            !!formData.fullname &&
            !!formData.email
        );
    };
    //

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log("Data:", formData);
        }
    };

    return (
        // Sign-up Box
        <Box className="sup-container" h="100%">
            <Stack className="container" mx="auto">
                {" "}
                <Stack
                    id="inner-close_logo"
                    direction="row"
                    alignItems="flex-start"
                    justifyContent="center"
                >
                    <Box id="signup-close">
                        <IconButton
                            aria-label="Example"
                            size="small"
                            color="secondary"
                        >
                            <IoIosClose size="35px" />
                        </IconButton>
                    </Box>
                    <Box id="signup-logo" width="100%" textAlign="center">
                        {/* <h1>Chromochat</h1> */}
                    </Box>
                </Stack>
                <Box
                    component="form"
                    autoComplete="off"
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <Box id="inner-1">
                        <Typography
                            variant="h4"
                            marginBottom={4}
                            id="h4-title-main"
                        >
                            {" "}
                            Create your account{" "}
                        </Typography>
                        {/* the form */}
                        <Box className="sign-up-form">
                            <Stack spacing={3}>
                                <InputFullName
                                    value={formData.fullname}
                                    change={handleChange}
                                    error={errors.fullname}
                                />
                                <InputEmail
                                    value={formData.email}
                                    change={handleChange}
                                    error={errors.email}
                                />
                            </Stack>

                            {/* birth date */}
                            <Box id="birth-date" marginTop={3}>
                                <BirthDateText />
                                <Box my={2} />
                                <BirthDateSelector />
                            </Box>
                        </Box>
                    </Box>
                    <Box className="signup-next">
                        <Button
                            type="submit"
                            variant="contained"
                            className="signup-button-next"
                            color="secondary"
                            disabled={!validateForm()}
                        >
                            Next
                        </Button>
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
}

/* Fullname input */
const InputFullName = ({ value, change, error }) => {
    return (
        <TextField
            type="text"
            variant="outlined"
            label="Full name"
            name="fullname"
            className="input-outlined-basic"
            color="secondary"
            value={value}
            onChange={change}
            error={!!error}
            helperText={error}
        />
    );
};

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
            color="secondary"
            value={value}
            onChange={change}
            error={!!error}
            helperText={error}
        />
    );
};

const BirthDateText = () => {
    return (
        <>
            {" "}
            <Typography variant="h6" component="h4" className="bday-title">
                Birth date
            </Typography>
            <Typography
                variant="subtitle2"
                component="small"
                color="secondary.dark"
                fontWeight={400}
            >
                {<textContentData.__AgeConfirmation__ />}
            </Typography>
        </>
    );
};

/* Birthdate Selector */
const BirthDateSelector = () => {
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");

    return (
        <Box className="month-day-year">
            <Stack direction="horizontal" gap={2}>
                {/* Months */}
                <Box width={220}>
                    <FormControl fullWidth color="secondary">
                        <InputLabel id="month-select-lbl">Month</InputLabel>
                        <Select
                            value={month}
                            labelId="month-select-lbl"
                            id="month-select"
                            label="Month"
                            onChange={(e) => setMonth(e.target.value)}
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
