import Header from '@/components/layouts/Header';

export default function CsRequestCompleteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header type="pop-up" title="취소/반품 요청" />
            <main
                className="flex max-h-[812px] flex-col justify-between px-5 pb-16 pt-40"
                style={{
                    height: 'calc(100vh - 56px)',
                }}
            >
                {children}
            </main>
        </>
    );
}
