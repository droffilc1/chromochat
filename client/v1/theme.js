"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    typography: {
        fontFamily: '"Segoe UI"',
    },
    palette: {
        primary: {
            main: "#14171A",
            light: "#657786",
            contrastText: "#fff",
        },
        secondary: {
            main: "#E1E8ED",
            light: "#131415",
            dark: "#676c71",
        },
        error: {
            main: "#d51d28",
            contrastText: "#d51d28",
        },
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "& fieldset": {
                        border: "1px solid #2c2e31",
                    },

                    "&.Mui-focused fieldset": {
                        border: "1px solid #2c2e31",
                    },
                    ".MuiInputBase-input": {
                        color: "#E1E8ED",
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&.MuiInputLabel-outlined": {
                        color: "#676c71", // Initial color of the label
                    },
                    "&.MuiInputLabel-outlined.MuiInputLabel-shrink": {
                        color: "#E1E8ED", // Color when label shrinks (focused/hovered)
                    },
                },
            },
        },
    },
});

export default theme;
