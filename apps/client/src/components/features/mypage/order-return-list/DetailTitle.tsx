export default function DetailTitle({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <h3 className="text-body-01 mb-5 border-b py-2 font-semibold">
            {children}
        </h3>
    );
}
