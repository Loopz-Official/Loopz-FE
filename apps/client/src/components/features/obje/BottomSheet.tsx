const BottomSheet = () => {
    return (
        <div className="bottom-17 absolute z-50 h-fit w-full rounded-t-2xl bg-white px-5 pb-7">
            <section className="mb-3 flex h-7 w-full items-center justify-center">
                <div className="bg-gray-11 h-1 w-10 rounded-full" />
            </section>

            <section className="flex w-full flex-col gap-4">
                <section className="flex w-fit flex-col gap-1">
                    <span className="text-body-02 font-semibold">
                        빈티지 다이얼 전화기
                    </span>
                    <span className="text-caption-01 font-semibold">
                        21,000원
                    </span>
                </section>

                <div className="border-gray-regular h-[0px] w-full border-[0.5px] border-solid" />

                <section className="flex items-center justify-between">
                    <div className="text-caption-01 flex items-center gap-2">
                        <span className="font-semibold">구매 수량</span>
                        <div className="border-gray-regular h-3 w-[0px] border-[0.5px] border-solid" />
                        <span className="text-point font-medium">3개 남음</span>
                    </div>
                </section>

                <div className="border-gray-regular h-[0px] w-full border-[0.5px] border-solid" />

                <section className="flex w-full items-center justify-between">
                    <span className="text-caption-01 font-semibold">
                        총 상품 금액 (3개)
                    </span>
                    <span className="text-body-01 font-semibold">63,000원</span>
                </section>
            </section>
        </div>
    );
};

export default BottomSheet;
