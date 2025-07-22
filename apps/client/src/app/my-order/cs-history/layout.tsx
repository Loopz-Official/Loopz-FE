import Header from '@/components/layouts/Header';

export default function MyCSHistoryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header type="title" title="취소/반품 내역" />
            <main>{children}</main>
        </>
    );
}
