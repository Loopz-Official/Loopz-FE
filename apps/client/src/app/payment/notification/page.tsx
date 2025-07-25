'use client';

import { LoopzIcon } from '@/icons/Header';

export default function PaymentNotificationPage() {
    return (
        <div className="flex min-h-dvh flex-col items-center justify-center bg-white px-6 py-12">
            <h1 className="text-headline-02 mb-5 text-center text-gray-900">
                결제가 성공적으로 요청되었어요!
            </h1>
            <div className="flex flex-col items-center justify-center gap-5">
                <p className="text-body-01 text-center tracking-normal text-gray-700">
                    소중한 주문이 안전하게 접수되었습니다.
                    <br />
                    <span className="text-point font-semibold">
                        이전 주문 페이지
                    </span>
                    로 돌아가
                    <br />
                    결제를 완료해주세요.
                    <br />
                    <span className="text-gray-04 text-body-03 font-normal">
                        (이 창은 닫으셔도 괜찮아요)
                    </span>
                </p>
                {/* Loopz 브랜드 로고 */}
                <LoopzIcon />
            </div>
        </div>
    );
}
