"use client";

import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import "./style.scss";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import Image from "next/image";
import ChromChatLogo from "../../../../public-assets/logos/logo-chromochat-ic.svg";
import InputFullName from "../inputs/FullnameInput/component";
import InputEmail from "../inputs/EmailAdressInput/component";
import BirthDateText from "../contents/Text__Birthdate/component";
import BirthDateSelector from "../inputs/Selector__birthdate/component";
import InputPassword from "../inputs/PasswordInput/component";
import InputConfirmPassword from "../inputs/ConfirmPasswordInput/component";
import PasswordField from "../PasswordField/component";
import PhoneNumberInput from "../inputs/PhoneNumberInput/component";
import formatPhoneNumber from "utils/formattPhoneNumber";
import libphonenumber from "google-libphonenumber";
import TermsCheckBox from "../inputs/TermsCheckBox/component";

export default function SignupModalBoxPopUp({ onClose }) {
    /**
     * @returns SIGNUP MODAL POP-UP
     */

    const [formPart, setFormPart] = useState(0);
    const [nextPart, setNextPart] = useState(false);

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        confirmPass: "",
        bdMonth: "",
        bdDay: "",
        bdYear: "",
        terms: false,
    });
    const [errors, setErrors] = useState({});

    // PhoneNumber Field
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

    const validatePhoneNumber = (number) => {
        const txtErrors = {};

        try {
            const phoneNumber = phoneUtil.parse(number, "US");
            const isValid = phoneUtil.isValidNumber(phoneNumber);

            if (!isValid)
                txtErrors.phone = "Please enter a valid phone number.";
        } catch (error) {}

        // if (number) {
        //     if (!isValid)

        // }
        console.log(txtErrors);
        setErrors(txtErrors);
    };

    // Password Field
    const [passwordMatch, setPasswordMatch] = useState(true);

    const validatePasswords = (fd) => {
        setPasswordMatch(fd.password === fd.confirmPass);

        console.log(fd.password === fd.confirmPass);
    };

    // Email Field
    const validateEmail = (email) => {
        let txtErrors = {};
        let formatValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email) {
            formatValid = emailRegex.test(email);

            if (!formatValid)
                txtErrors.email = "Please enter a valid email address.";
        }

        setErrors(txtErrors);

        return Object.keys(txtErrors).length === 0 && formatValid;
    };

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (e.target.type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else {
            const updatedFormData = { ...formData, [name]: value };
            setFormData(updatedFormData);

            if (name === "confirmPass") validatePasswords(updatedFormData);
            if (name === "password" && formData.confirmPass)
                validatePasswords(updatedFormData);
            if (name === "phone") {
                setFormData({
                    ...updatedFormData,
                    [name]: formatPhoneNumber(value),
                });
                validatePhoneNumber(value);
            }
            if (name === "email") {
                validateEmail(value);
            }
        }
    };

    const monthChange = (e) => {
        setMonth(e.target.value);
    };

    //

    const validatePart2 = () => {
        // console.log(
        //     Object.keys(errors).length === 0 &&
        //         !!formData.phone &&
        //         !!formData.password &&
        //         !!formData.confirmPass &&
        //         !!formData.terms,
        //     Object.keys(errors).length === 0,
        //     !!formData.phone,
        //     !!formData.password,
        //     !!formData.confirmPass,
        //     !!formData.terms,
        //     errors
        // );
        return (
            Object.keys(errors).length === 0 &&
            !!formData.phone &&
            !!formData.password &&
            !!formData.confirmPass &&
            !!formData.terms
        );
    };

    const validatePart1 = () => {
        return (
            Object.keys(errors).length === 0 &&
            !!formData.fullname &&
            !!formData.email &&
            !!formData.bdMonth &&
            !!formData.bdDay &&
            !!formData.bdYear
        );
    };
    //

    //handle Previous and Next Buttons
    const handleNext = (e) => {
        e.preventDefault();
        if (validatePart1()) {
            setNextPart(true);
        }
    };

    // handle successful signup
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validatePart1() && validatePart2() && formData.terms) {
            console.log("Data:", formData);

            setNextPart(true);

            try {
                const response = await fetch(
                    "http://localhost:5000/auth/register",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            fullname: formData.fullname,
                            email: formData.email,
                            password: formData.password,
                            phone: formatPhoneNumber(formData.phone),
                            bdDay: formData.bdDay,
                            bdMonth: formData.bdMonth,
                            bdYear: formData.bdYear,
                        }),
                    }
                );

                const data = await response.json();

                if (response.status == 201) {
                    console.log("User registered successfully", data);

                    onClose();
                } else {
                    console.log("Error:", data.message);
                }
            } catch (error) {
                console.error("Error occurred..!", error);
            }
        }
    };

    // * Still need a good structure...

    return (
        // Sign-up Box
        <Box className="signup__modal__container" h="100%">
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
                            onClick={onClose}
                        >
                            <IoIosClose size="35px" />
                        </IconButton>
                    </Box>
                    <Box id="signup-logo" width="100%" textAlign="center">
                        {/* <h1>Chromochat</h1> */}
                        <Image
                            src={ChromChatLogo}
                            className="signup-logo__logo"
                            width={55}
                        />
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
                        <Box
                            className="part-1__create-account"
                            display={nextPart ? "none" : "block"}
                            sx={{
                                transform: nextPart
                                    ? "translateY(-50%)"
                                    : "translateY(0%)",
                                transition: "transform 0.5s ease-in-out",
                            }}
                        >
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
                                    <BirthDateSelector
                                        monthValue={formData.bdMonth}
                                        dayValue={formData.bdDay}
                                        yearValue={formData.bdYear}
                                        onChange={handleChange}
                                    />
                                </Box>
                            </Box>
                            <Box className="signup-next">
                                <Button
                                    variant="contained"
                                    className="signup-button-next"
                                    color="secondary"
                                    disabled={!validatePart1()}
                                    onClick={handleNext}
                                >
                                    Next
                                </Button>
                            </Box>
                        </Box>

                        <Box
                            className="part-2__password-form"
                            display={!nextPart ? "none" : "block"}
                            sx={{
                                transform: !nextPart
                                    ? "translateY(-50%)"
                                    : "translateY(0%)",
                            }}
                        >
                            <Stack spacing={3} mb={4}>
                                <PhoneNumberInput
                                    value={formData.phone}
                                    change={handleChange}
                                    error={errors.phone}
                                />
                                <PasswordField
                                    values={{
                                        passwordValue: formData.password,
                                        confirmPasswordValue:
                                            formData.confirmPass,
                                    }}
                                    change={handleChange}
                                    error={!passwordMatch}
                                />
                                <TermsCheckBox
                                    checked={formData.terms}
                                    change={handleChange}
                                />
                                <Box marginTop="410px" />
                                <Button
                                    width="100%"
                                    type="submit"
                                    variant="contained"
                                    className="signup-button"
                                    color="secondary"
                                    sx={{ padding: "12px 10px" }}
                                    disabled={!validatePart2()}
                                >
                                    Sign up
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
}
