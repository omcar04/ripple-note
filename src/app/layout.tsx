import type {Metadata} from "next";
import {Geist, Geist_Mono, Funnel_Display} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const funnelDisplay = Funnel_Display({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-funnel-display"
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "RippleNote",
    description: "LLM implementation of something idk",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>

        <body
            className={`${geistSans.variable} ${geistMono.variable} ${funnelDisplay.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
