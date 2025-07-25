import Header from '@/components/layouts/Header';

export default function MyInfoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header type="title" title="회원정보 수정" />
            <main className="pb-26 px-5 pt-6">{children}</main>
        </>
    );
}
