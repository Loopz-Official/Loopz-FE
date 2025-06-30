import Header from '@/components/layouts/Header';
import NavigationBar from '@/components/layouts/NavigationBar';

export default function ObjectDetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header type="main" />
            <main className="pb-14">{children}</main>
            <NavigationBar />
        </>
    );
}
