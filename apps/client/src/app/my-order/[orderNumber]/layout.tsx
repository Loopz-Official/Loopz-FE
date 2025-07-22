import Header from '@/components/layouts/Header';

export default function MyOrderDetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header type="title" title="주문 상세" />
            <main>{children}</main>
        </>
    );
}
