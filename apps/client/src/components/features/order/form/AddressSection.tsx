export default function AddressSection() {
    return (
        <>
            <header className="flex items-center justify-between">
                <h2 className="text-body-01 font-semibold">배송지 정보</h2>
                <button className="text-caption-01 rounded-xs border-gray-regular flex w-[3.375rem] items-center justify-center border py-1">
                    변경
                </button>
            </header>

            <div className="space-y-1.5">
                <div className="flex items-center gap-1">
                    <span className="text-body-03 font-semibold">이예나</span>
                    <span className="text-caption-01 text-point font-semibold">
                        기본 배송지
                    </span>
                </div>
                <div className="text-caption-01 tracking-normal">
                    [09876] 서울특별시 영등포구 도신로 29길 28, 103동 801호
                </div>
                <div className="text-caption-01 tracking-normal">
                    010-XXXX-XXXX
                </div>
            </div>

            <button className="rounded-xs border-gray-regular text-caption-01 text-disabled flex items-center justify-between border px-3 py-2.5">
                배송 요청사항 선택
                <div className="h-4 w-4 bg-black" />
            </button>
        </>
    );
}
