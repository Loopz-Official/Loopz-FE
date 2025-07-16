import SuspenseWrapper from '@/components/common/SuspenseWrapper';

export default function OrderCompleteLayout({
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
