const VerticalDivider = ({
    height = '12',
    borderWidth = '0.5',
}: {
    height?: string;
    borderWidth?: string;
}) => {
    return (
        <span
            className="border-gray-regular w-[0px] border-solid"
            style={{
                height: `${height}px`,
                borderWidth: `${borderWidth}px`,
            }}
        ></span>
    );
};

export default VerticalDivider;
