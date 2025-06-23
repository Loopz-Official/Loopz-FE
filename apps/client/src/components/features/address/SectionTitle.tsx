export default function SectionTitle({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            {children}&nbsp;
            <span className="text-point text-body-02">*</span>
        </div>
    );
}
