import Header from '@/components/layouts/Header';

export default function RefundLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header
                type="pop-up"
                title="환불 규정"
                redirectAction={{ type: 'back' }}
            />
            <main className="px-5 py-6">{children}</main>
        </>
    );
}
