import Header from '@/components/layouts/Header';

export default function MyOrderDetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header type="title" title="취소/반품 상세" />
            <main>{children}</main>
        </>
    );
}
