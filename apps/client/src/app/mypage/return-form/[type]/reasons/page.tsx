import RadioSection from '@/components/features/mypage/return-form/RadioSection';
import Header from '@/components/layouts/Header';
import { CANCEL_REASONS, RETURN_REASONS } from '@/constants/return';

export default async function Page({
    params,
}: {
    params: Promise<{ type: 'cancel' | 'return' }>;
}) {
    const { type } = await params;
    const isCancel = type === 'cancel';
    const reasons = isCancel ? CANCEL_REASONS : RETURN_REASONS;

    return (
        <div>
            <Header
                type="title"
                title={isCancel ? '취소 요청' : '반품/환불 요청'}
            />

            <div className="px-5 py-8">
                <div className="mb-4 space-y-1">
                    <div className="text-body-01 font-semibold">
                        {isCancel ? '취소' : '환불'} 사유를 선택해 주세요.
                    </div>
                    {!isCancel && (
                        <div className="text-body-03 text-gray-dark font-normal">
                            * 단순 변심으로 인한 요청은 구매 후{' '}
                            <span className="text-point">7일 이내</span>에
                            가능하며, 이외 요청은 환불 규정에 따릅니다.
                        </div>
                    )}
                </div>

                <RadioSection options={reasons} />
            </div>

            {/* TODO: 버튼 추가 */}
        </div>
    );
}
