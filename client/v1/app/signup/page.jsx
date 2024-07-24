"use client";

import "../../styles/globals.scss";
import "./style.scss";
import { useState, React } from "react";
import {
    Box,
    Button,
    Divider,
    Drawer,
    Modal,
    Stack,
    Typography,
} from "@mui/material";
import SignupModalBoxPopUp from "./components/SignupModalBoxPopUp/signup-modal-box-popup";
import { FaGoogle, FaApple } from "react-icons/fa";
import { BsApple } from "react-icons/bs";
import Head from "next/head";
import Image from "next/image";
import HeroLogoBanner from "../../public-assets/illustrations/chromocircles.svg";
import ChromchatLogo from "../../public-assets/logos/logo-chromochat-ic.svg";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <main>
                <Modal
                    open={isModalOpen}
                    className="signup__modal"
                    sx={{
                        "&.MuiModal-hidden": {
                            color: "red",
                            backgroundColor: "red",
                        },
                    }}
                >
                    <SignupModalBoxPopUp onClose={closeModal} />
                </Modal>
                <Box id="main-container">
                    <Stack direction="row" id="flex-container-divider">
                        {/* PART 2 */}
                        <Box id="part-2">
                            <Image
                                id="hero-logo-banner"
                                src={HeroLogoBanner}
                            ></Image>
                        </Box>
                        <Box id="part-1">
                            <Box id="wrapper__1" mx="auto">
                                <Stack
                                    direction="row"
                                    className="wrapper1__stacker"
                                    spacing={0.7}
                                >
                                    <Image src={ChromchatLogo} width={49}  height={47}/>
                                    <Typography
                                        variant="h1"
                                        className="logo-title"
                                    >
                                        chromochat
                                    </Typography>
                                </Stack>
                                <Typography variant="h1" id="main-h1">
                                    It's all about chatting
                                </Typography>

                                <Box id="box-1">
                                    {" "}
                                    <Typography variant="h2" id="main-h2">
                                        Sign-up.
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
                                            onClick={openModal}
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
                    </Stack>
                </Box>
            </main>
        </>
    );
}
