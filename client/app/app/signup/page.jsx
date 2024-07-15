import "./style.scss";
import { useState, React } from "react";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import CreateAcountPopUp from "./components/CreateAcountPopUp";
import { FaGoogle, FaApple } from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import Head from "next/head";
import Image from "next/image";
import HeroLogoBanner from "./public/svg/logo-chromochat.svg";

export default function Page() {
    return (
        <>
            <Head>
                <title>Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Box id="main-container">
                    <Stack direction="row" id="flex-container-divider">
                        <Box id="part-1">
                            <Box id="wrapper__1" mx="auto">
                                <Typography variant="h1" id="main-h1">
                                    It's all about chatting
                                </Typography>

                                <Box id="box-1">
                                    {" "}
                                    <Typography variant="h2" id="main-h2">
                                        Sign up now.
                                    </Typography>
                                    {/* 1 */}
                                    <Box id="box-1-inner1">
                                        <Button
                                            className="signup-with-_"
                                            variant="contained"
                                            startIcon={<FaGoogle />}
                                            color="secondary"
                                        >
                                            Sign up with Google
                                        </Button>
                                        <Button
                                            className="signup-with-_"
                                            variant="contained"
                                            startIcon={<BsApple />}
                                            color="secondary"
                                        >
                                            Sign up with Apple
                                        </Button>
                                    </Box>
                                    {/* 2 */}
                                    <Box id="box-1-inner2" my="10px">
                                        <Divider id="divider" variant="middle">
                                            or
                                        </Divider>
                                    </Box>
                                    {/* 3 */}
                                    <Box id="create-account-box">
                                        <Button
                                            id="create-account-button"
                                            variant="contained"
                                        >
                                            Create an account
                                        </Button>
                                        <Box>
                                            <Typography
                                                variant="subtitle2"
                                                id="terms-of-service"
                                            >
                                                In signing up, you agree to the
                                                Terms of Service and the Privacy
                                                Policy, including the Use of
                                                Cookies.
                                            </Typography>
                                        </Box>
                                    </Box>
                                    {/* 4 */}
                                    <Box id="sign-in-box">
                                        <Typography
                                            variant="subtitle1"
                                            id="already-have-account"
                                        >
                                            Already got an account?
                                        </Typography>
                                        <Button id="sign-in-button">
                                            Sign in
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        {/* PART 2 */}
                        <Box id="part-2">
                            <Image id="hero-logo-banner"  src={HeroLogoBanner}></Image>
                        </Box>
                    </Stack>
                </Box>
            </main>
        </>
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
    
    let days = Array.from({ length: 31 }, (_, i) => i + 1);
    const years = Array.from(
        { length: 101 },
        (_, i) => new Date().getFullYear() - i
    );
    
    if (month === "February") {
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        if (isLeapYear) {
            days = Array.from({ length: 29 }, (_, i) => i + 1);
        } else {
            days = Array.from({ length: 28 }, (_, i) => i + 1);
        }
    } else if (["April", "June", "September", "November"].includes(month)) {
        days = Array.from({ length: 30 }, (_, i) => i + 1);
    }

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
