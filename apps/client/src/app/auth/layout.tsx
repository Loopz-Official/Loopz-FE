'use client';

import { usePathname } from 'next/navigation';

import Header from '@/components/layouts/Header';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/auth/login';

    return (
        <div className="flex h-screen w-full flex-col px-5">
            {!isLoginPage && <Header type="title" title="회원가입" />}
            <main className="flex grow flex-col justify-between pb-16 pt-8">
                {children}
            </main>
        </div>
    );
}
