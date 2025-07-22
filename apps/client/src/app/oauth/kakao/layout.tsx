import SuspenseWrapper from '@/components/common/SuspenseWrapper';

export default function KakaoRediretLayout({
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
