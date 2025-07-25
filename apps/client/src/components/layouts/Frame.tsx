'use client';

import { usePathname } from 'next/navigation';
import { Toaster } from 'sonner';

import BottomGNB from './BottomGNB';

export default function Frame({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isNavbarVisiblePaths = ['/main', '/mypage', '/like', '/about'];
    const isNavbarVisible = isNavbarVisiblePaths.includes(pathname);

    return (
        <div className="mx-auto w-full max-w-2xl">
            {children}
            {isNavbarVisible && <BottomGNB />}
            <Toaster
                toastOptions={{
                    style: {
                        border: 'none',
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
                visibleToasts={1}
            />
        </div>
    );
}
