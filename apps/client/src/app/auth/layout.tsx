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
        <div className="flex h-screen w-full flex-col px-5">
            {!isCompletePage ? (
                <>
                    {!isLoginPage && <Header type="title" title="회원가입" />}
                    <main
                        className={clsx(
                            'flex grow flex-col justify-between',
                            isLoginPage ? 'pt-70 pb-16' : 'pb-16 pt-8'
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
