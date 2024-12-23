import type { Metadata } from 'next';
import { Nunito_Sans, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from './components/Header';

const nunitoSans = Nunito_Sans({
    variable: '--font-nunito-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Rest Countries',
    description: 'Built by Holardev',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${nunitoSans.variable} ${geistMono.variable} antialiased`}
            >
                <Header />
                <main>{children}</main>
            </body>
        </html>
    );
}
