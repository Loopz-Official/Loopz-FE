export default function NoItem() {
    return (
        <div className="fixed left-0 top-0 flex h-dvh w-dvw items-center justify-center">
            <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-5">
                    <div className="opacity-33 h-[3.375rem] w-[3.375rem] bg-[url('/alert.svg')] bg-center bg-no-repeat" />
                    <div className="text-headline-04 font-normal">
                        해당 상품 내역이 없습니다.
                    </div>
                </div>
            </div>
        </div>
    );
}
