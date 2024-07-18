import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "theme";
import "./globals.scss";

export const metadata = {
    title: "Chromochat",
    description: "A chat web app for Web stack portfolio",
    icons: {
        icon: '/logo-chromochat.svg'
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}> { children } </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
