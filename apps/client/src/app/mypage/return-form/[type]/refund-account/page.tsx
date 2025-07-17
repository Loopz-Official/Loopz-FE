import CheckBox from '@/components/common/CheckBox';
import Divider from '@/components/features/mypage/Divider';
import AccountInformation from '@/components/features/mypage/return-form/AccountInformation';
import PhoneNumberInformation from '@/components/features/mypage/return-form/PhoneNumberInformation';
import ReturnProductItem from '@/components/features/mypage/return-form/ReturnProductItem';
import Header from '@/components/layouts/Header';

export default async function Page({
    params,
}: {
    params: Promise<{ type: 'cancel' | 'return' }>;
}) {
    const { type } = await params;
    const isCancel = type === 'cancel';

    return (
        <div>
            <Header
                type="title"
                title={isCancel ? '취소 요청' : '반품/환불 요청'}
            />

            <div className="px-5 py-6">
                <ReturnProductItem type={isCancel ? 'cancel' : 'return'} />
            </div>

            <Divider />

            {!isCancel && (
                <div className="px-5 pb-4 pt-6">
                    <PhoneNumberInformation />
                </div>
            )}

            <div className="px-5 pb-8 pt-6">
                <AccountInformation />
            </div>

            <Divider />

            <div className="px-5 py-6">
                {!isCancel && (
                    <>
                        <div className="text-body-03 mb-1 font-semibold">
                            반품 시 배송비는 고객 부담으로 처리됩니다.
                        </div>
                        <div className="text-caption-01 text-gray-dark mb-3">
                            * 착불로 반송하실 경우에는 해당 배송비를 제외한
                            금액으로 환불 처리됩니다.
                        </div>
                    </>
                )}

                <div className="flex items-center gap-2">
                    <CheckBox />
                    <span className="text-body-03 text-gray-dark font-normal">
                        확인했습니다.
                    </span>
                </div>
            </div>

            {/* TODO: 버튼 추가 */}
        </div>
    );
}
