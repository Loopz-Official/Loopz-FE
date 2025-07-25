import Header from '@/components/layouts/Header';

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header type="main" />
            <main className="pb-14">{children}</main>
        </>
    );
}
