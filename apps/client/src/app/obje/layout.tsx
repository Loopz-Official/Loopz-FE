import { Toaster } from 'sonner';

import BottomPurchaseCTA from '@/components/features/obje/BottomPurchaseCTA';
import Header from '@/components/layouts/Header';

export default function ObjectDetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header type="sub" />
            <main className="pb-17">{children}</main>
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
            <BottomPurchaseCTA />
        </>
    );
}
