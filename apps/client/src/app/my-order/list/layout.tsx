import Header from '@/components/layouts/Header';

export default function MyOrderListLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header type="title" title="주문 내역" />
            <main>{children}</main>
        </>
    );
}
