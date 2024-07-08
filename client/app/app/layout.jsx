import "./globals.css";
import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
    title: "Chromochat",
    description: "A chat web app for everyone"
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={roboto.className}>
            <body>{children}</body>
        </html>
    );
}
