const CheckBox = ({
    isChecked,
    onChange,
}: {
    isChecked?: boolean;
    onChange?: () => void;
}) => {
    return (
        <input
            type="checkbox"
            checked={isChecked}
            onChange={onChange}
            className="border-gray-09 rounded-xs not-checked:bg-[url('/unchecked-check.svg')] relative h-4 w-4 cursor-pointer appearance-none border bg-center bg-no-repeat checked:border-black checked:bg-black checked:bg-[url('/checked-check.svg')]"
        />
    );
};

export default CheckBox;
