import CustomInput from './CustomInput';

export default function PhoneNumberInformation() {
    return (
        <div className="space-y-1.5">
            <div className="text-body-01 font-semibold">
                환불 요청 확인 후에 연락을 드릴 수 있도록 전화번호를 남겨주세요.
            </div>

            <CustomInput placeholder="전화번호를 입력해 주세요" />
        </div>
    );
}
