import BottomPurchaseCTA from '@/components/features/obje/BottomPurchaseCTA';
import Header from '@/components/layouts/Header';

export default function ObjectDetailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header type="sub" />
            <main className="pb-17">{children}</main>
            <BottomPurchaseCTA />
        </>
    );
}
