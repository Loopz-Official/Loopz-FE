'use client';

import { usePathname } from 'next/navigation';

import NavigationBar from './NavigationBar';

export default function Frame({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isNavbarVisiblePaths = ['/main', '/mypage'];
    const isNavbarVisible = isNavbarVisiblePaths.some((path) =>
        pathname.includes(path)
    );

    return (
        <div className="mx-auto w-full max-w-2xl">
            {children}
            {isNavbarVisible && <NavigationBar />}
        </div>
    );
}
