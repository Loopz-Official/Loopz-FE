'use client';

import Header from '@/components/layouts/Header';

export default function CartLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header type="title" title="장바구니" />
            <main>{children}</main>
        </>
    );
}
