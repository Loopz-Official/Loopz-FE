import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
    src: './fonts/PretendardVariable.woff2',
    display: 'swap',
    weight: '45 920',
    variable: '--font-pretendard',
});

export const metadata: Metadata = {
    title: 'Loopz',
    description: 'Loopz web application',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body className={`${pretendard.className} tracking-tight`}>
                {children}
            </body>
        </html>
    );
}
