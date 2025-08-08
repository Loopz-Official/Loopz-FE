import Header from '@/components/layouts/Header';

export default function LeaveLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header type="title" title="탈퇴하기" />
            {children}
        </>
    );
}
