import CheckBox from '@/components/common/CheckBox';
import Divider from '@/components/features/mypage/Divider';
import AccountInformation from '@/components/features/mypage/return-form/AccountInformation';
import PhoneNumberInformation from '@/components/features/mypage/return-form/PhoneNumberInformation';
import RadioSection from '@/components/features/mypage/return-form/RadioSection';
import ReturnProductItem from '@/components/features/mypage/return-form/ReturnProductItem';
import Header from '@/components/layouts/Header';
import { CANCEL_REASONS, RETURN_REASONS } from '@/constants/return';

export default function Page() {
    // TODO: 동적 라우팅 또는 query로 cancel(취소)인지 return(반품)인지 받아서 처리
    const isCancel = false;
    const reasons = isCancel ? CANCEL_REASONS : RETURN_REASONS;

    // TODO: 취소 및 반품/환불 요청 UI가 두 가지 버전으로 있어서 디자인 논의 후 통합해야 함
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

            <div className="px-5 pb-8 pt-6">
                <RadioSection options={reasons} />
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
