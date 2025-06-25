export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="h-screen w-full px-5">{children}</div>;
}
