import DetailTitle from '../order-return-list/DetailTitle';

export default function ReceiptInformation() {
    return (
        <div>
            <DetailTitle>수령 정보</DetailTitle>
            <div className="text-body-03 grid grid-cols-[auto_1fr] grid-rows-[auto_auto_auto] gap-x-4 gap-y-3 font-normal">
                <div className="text-gray-dark">수령인</div>
                <div>이*나</div>

                <div className="text-gray-dark">휴대폰</div>
                <div>010-****-1111</div>

                <div className="text-gray-dark">수령방법</div>
                <div className="break-keep">
                    [03152] 서울 영등포구 도신로 29길 28동 1043동 2401호
                </div>
            </div>
        </div>
    );
}
