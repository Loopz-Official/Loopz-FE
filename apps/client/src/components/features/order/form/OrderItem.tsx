export default function OrderItem() {
    return (
        <div className="flex justify-between">
            <div>
                <h3 className="text-body-01 font-semibold">
                    빈티지 다이얼 전화기
                </h3>
                <span className="text-caption-01 text-gray-dark tracking-normal">
                    21,000원 / 수량 1개
                </span>
            </div>
            <div className="bg-gray-regular aspect-square h-auto w-[clamp(70px,20vw,100px)]" />
        </div>
    );
}
