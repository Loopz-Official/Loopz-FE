export default function CustomInput({ placeholder }: { placeholder?: string }) {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className="border-gray-regular text-body-03 font-regular placeholder:text-disabled w-full rounded-sm border px-3 py-2.5"
        />
    );
}
