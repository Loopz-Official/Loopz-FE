import Header from '@/components/layouts/Header';

export default function MyPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header type="main" />
            <main className="px-5">{children}</main>
        </>
    );
}
