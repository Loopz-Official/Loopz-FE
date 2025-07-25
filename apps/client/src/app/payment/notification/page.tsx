'use client';

import LoopzLogo from '@/assets/header/loopz.svg';

export default function PaymentNotificationPage() {
    return (
        <div className="flex min-h-dvh flex-col items-center justify-center bg-white px-6 py-12">
            <h1 className="mb-4 text-center text-2xl font-bold text-gray-900">
                결제가 성공적으로 요청되었어요!
            </h1>
            <div className="flex flex-col items-center justify-center gap-3">
                <p className="mb-2 text-center text-base text-gray-700">
                    소중한 주문이 안전하게 접수되었습니다.
                    <br />
                    <span className="font-semibold text-[#FF5A2D]">
                        이전 주문 페이지
                    </span>
                    로 돌아가
                    <br />
                    결제를 완료해주세요.
                    <br />
                    <span className="text-sm text-gray-400">
                        (이 창은 닫으셔도 괜찮아요)
                    </span>
                </p>
                {/* Loopz 브랜드 로고 */}
                <LoopzLogo width={80} height={32} />
            </div>
        </div>
    );
}
