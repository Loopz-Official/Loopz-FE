const OrderDetailPageHeader = ({ orderNumber }: { orderNumber: string }) => {
    return (
        <div className="text-body-03 text-gray-03 h-13 flex w-full items-center gap-1 px-5 font-semibold">
            <span className="whitespace-nowrap font-normal">주문번호</span>
            <p className="truncate">ORD{orderNumber}</p>
        </div>
    );
};

export default OrderDetailPageHeader;
