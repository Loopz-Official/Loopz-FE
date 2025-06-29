'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import Header from '@/components/layouts/Header';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/auth/login';
    const isCompletePage = pathname === '/auth/complete';

    return (
        <div className="flex h-dvh w-full flex-col px-5 pb-12">
            {!isCompletePage ? (
                <>
                    {!isLoginPage && <Header type="title" title="회원가입" />}
                    <main
                        className={clsx(
                            'flex h-full flex-col justify-between',
                            isLoginPage ? '' : 'pt-8'
                        )}
                    >
                        {children}
                    </main>
                </>
            ) : (
                <main className="flex h-full flex-col items-center justify-center">
                    {children}
                </main>
            )}
        </div>
    );
}
