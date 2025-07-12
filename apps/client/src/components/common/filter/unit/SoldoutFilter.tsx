const SoldoutFilter = () => {
    return (
        <label className="flex w-fit cursor-pointer items-center gap-2">
            <input
                type="checkbox"
                className="border-gray-09 rounded-xs not-checked:bg-[url('/checkbox/unchecked.svg')] relative h-4 w-4 appearance-none border bg-center bg-no-repeat checked:border-black checked:bg-black checked:bg-[url('/checkbox/checked.svg')]"
            />
            <span className="text-caption-01 text-gray-dark select-none">
                품절제외
            </span>
        </label>
    );
};

export default SoldoutFilter;
