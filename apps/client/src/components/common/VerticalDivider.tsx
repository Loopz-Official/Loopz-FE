const VerticalDivider = ({
    height = '3',
    borderWidth = '0.5',
}: {
    height?: string;
    borderWidth?: string;
}) => {
    return (
        <span
            className={`border-gray-regular h-${height} w-[0px] border-[${borderWidth}px] border-solid`}
        ></span>
    );
};

export default VerticalDivider;
