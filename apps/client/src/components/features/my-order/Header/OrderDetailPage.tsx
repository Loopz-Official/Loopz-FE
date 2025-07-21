interface OrderDetailPageHeaderProps {
    serialNumber: string;
    isCSRequested?: boolean;
}

const OrderDetailPageHeader = ({
    serialNumber,
    isCSRequested = false,
}: OrderDetailPageHeaderProps) => {
    return (
        <div className="text-body-03 text-gray-03 h-13 flex w-full items-center gap-1 px-5 font-semibold">
            <span className="whitespace-nowrap font-normal">
                {isCSRequested ? '접수번호' : '주문번호'}
            </span>
            <p className="truncate">
                {isCSRequested ? 'CS' : 'ORD'}
                {serialNumber}
            </p>
        </div>
    );
};

export default OrderDetailPageHeader;
