import LikeTabBar from '@/components/features/like/TabBar';
import Header from '@/components/layouts/Header';

export default function LikePageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="relative">
                <Header type="main" />
                <LikeTabBar />
                <main>{children}</main>
            </div>
        </>
    );
}
