'use client';

import { usePathname } from 'next/navigation';
import { Toaster } from 'sonner';

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
            <Toaster
                toastOptions={{
                    style: {
                        background: '#505050',
                        borderRadius: '4px',
                        padding: '16px 20px',
                        fontSize: '14px',
                        color: '#ffffff',
                    },
                    duration: 2500,
                }}
                position="bottom-center"
                offset={{ bottom: '84px' }}
                mobileOffset={{ bottom: '84px' }}
                expand={false}
            />
        </div>
    );
}
