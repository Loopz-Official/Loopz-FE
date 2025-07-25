export default function CustomInput({
    readOnly = false,
    placeholder,
    value,
    onChange,
}: {
    readOnly?: boolean;
    placeholder: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <input
            onChange={onChange}
            type="text"
            readOnly={readOnly}
            value={value}
            placeholder={placeholder}
            className="text-body-01 placeholder:text-disabled read-only:text-disabled border-gray-regular w-full rounded-sm border px-3 py-4 font-normal read-only:border-[#f7f7f7] read-only:bg-[#f7f7f7]"
        />
    );
}
