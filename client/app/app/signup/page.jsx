"use client";

import "./style.scss";
import {
    Backdrop,
    Box,
    Button,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import CreateAcountPopUp from "./components/CreateAcountPopUp";
import { FaGoogle, FaApple } from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import Head from "next/head";
import Image from "next/image";
import HeroLogoBanner from "./public/svg/logo-chromochat.svg";
import LOGO from "./public/svg/logo-chromochat-ic.svg";

import { useState } from "react";

export default function Page() {
    const [open, set_open] = useState(false);

    const handleOpen = () => {
        set_open(true);
    };

    const handleClose = () => {
        set_open(false);
    };

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
                                {" "}
                                <Box id="logo-box">
                                    <Image src={LOGO} id="logo-img"/>
                                    <h1 id="logo-txt">chromochat</h1>
                                </Box>
                                <Typography variant="h1" id="main-h1">
                                    It's all about chatting
                                </Typography>
                                <Box id="box-1">
                                    {" "}
                                    <Typography variant="h3" id="main-h2">
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
                                        <Box>
                                            <Button
                                                id="create-account-button"
                                                variant="contained"
                                                onClick={handleOpen}
                                            >
                                                Create an account
                                            </Button>
                                            <SignUpBackDrop
                                                open={open}
                                                _onClick_={handleClose}
                                            />
                                        </Box>

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
                            <Image
                                id="hero-logo-banner"
                                src={HeroLogoBanner}
                            ></Image>
                        </Box>
                    </Stack>
                </Box>
            </main>
        </>
    );
}

const SignUpBackDrop = ({ open, _onClick_ }) => {
    return (
        <Backdrop
            open={open}
            sx={{
                color: "#000",
                bgcolor: "#3246545d",
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <CreateAcountPopUp handleClick={_onClick_} />
        </Backdrop>
    );
};
