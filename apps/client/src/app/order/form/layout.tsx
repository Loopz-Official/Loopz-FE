import SuspenseWrapper from '@/components/common/Wrappers/SuspenseWrapper';

export default function OrderFormLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <SuspenseWrapper>{children}</SuspenseWrapper>;
}
