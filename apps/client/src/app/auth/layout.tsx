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
        <div className="h-screen w-full px-5">
            {!isLoginPage && <Header type="title" title="회원가입" />}
            {children}
        </div>
    );
}
