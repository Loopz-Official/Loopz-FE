import localFont from 'next/font/local';

import Frame from '@/components/layouts/Frame';
import { META } from '@/constants/meta';
import ReactQueryProviderWrapper from '@/providers/QueryProviderWrapper';

import type { Metadata } from 'next';

import './globals.css';

const pretendard = localFont({
    src: './fonts/PretendardVariable.woff2',
    display: 'swap',
    weight: '45 920',
    variable: '--font-pretendard',
});

export const metadata: Metadata = {
    metadataBase: new URL(META.URL),

    title: META.TITLE,
    description: META.DESCRIPTION,
    keywords: META.KEYWORDS,

    openGraph: {
        title: META.TITLE,
        description: META.DESCRIPTION,
        images: [
            {
                url: META.IMAGE_URL,
                width: 800,
                height: 600,
                alt: META.TITLE,
            },
        ],
        locale: META.LOCALE,
        type: META.TYPE,
    },
    twitter: {
        title: META.TITLE,
        description: META.DESCRIPTION,
        images: {
            url: META.IMAGE_URL,
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body
                className={`${pretendard.className} tracking-tight text-black`}
            >
                <ReactQueryProviderWrapper>
                    <Frame>{children}</Frame>
                </ReactQueryProviderWrapper>
            </body>
        </html>
    );
}
