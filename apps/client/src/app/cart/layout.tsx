'use client';

import Header from '@/components/layouts/Header';

export default function CartLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header type="title" title="장바구니" />
            <main className="grow">{children}</main>
        </div>
    );
}
