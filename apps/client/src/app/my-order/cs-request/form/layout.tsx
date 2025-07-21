import Header from '@/components/layouts/Header';

export default function MyOrderCsRequestFormLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header type="title" title="취소/반품 요청" />
            <main className="px-5 py-6">{children}</main>
        </>
    );
}
