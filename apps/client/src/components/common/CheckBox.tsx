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
            className="border-gray-09 rounded-xs not-checked:bg-[url('/checkbox/unchecked.svg')] relative h-4 w-4 appearance-none border bg-center bg-no-repeat checked:border-black checked:bg-black checked:bg-[url('/checkbox/checked.svg')]"
        />
    );
};

export default CheckBox;
