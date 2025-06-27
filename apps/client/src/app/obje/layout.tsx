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
            <main>{children}</main>
            <Toaster
                toastOptions={{
                    style: {
                        background: '#505050',
                        borderRadius: '4px',
                        padding: '16px 20px',
                        fontSize: '14px',
                        fontWeight: '400',
                        fontFamily: 'Pretendard Variable',
                        color: '#ffffff',
                    },
                }}
                className="bg-gray-03 rounded-sm text-white"
                position="bottom-center"
                offset={{ bottom: '84px' }}
                mobileOffset={{ bottom: '84px' }}
                expand={false}
            />
            <BottomPurchaseCTA />
        </>
    );
}
