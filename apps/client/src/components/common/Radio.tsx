export default function Radio({
    name,
    checked,
    onChange,
}: {
    name: string;
    checked: boolean;
    onChange: () => void;
}) {
    return (
        <input
            type="radio"
            name={name}
            checked={checked}
            onChange={onChange}
            className="border-gray-10 before:-translate-1/2 peer relative h-4 w-4 cursor-pointer appearance-none rounded-full border before:absolute before:left-1/2 before:top-1/2 before:hidden before:h-2.5 before:w-2.5 before:rounded-full before:bg-black checked:border-black checked:before:block"
        />
    );
}
