import SuspenseWrapper from '@/components/common/Wrappers/SuspenseWrapper';

export default function PaymentRedirectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SuspenseWrapper fallback={<div>Loading...</div>}>
            {children}
        </SuspenseWrapper>
    );
}
