import CustomInput from './CustomInput';

export default function AccountInformation() {
    return (
        <div className="space-y-5 px-5">
            <div className="text-body-01 font-semibold">
                환불을 위해 본인 명의의 계좌를 입력해 주세요.
            </div>

            <div>
                <div className="text-body-02 mb-1">입금 은행</div>
                <CustomInput placeholder="입금 은행을 입력해 주세요" />
            </div>

            <div>
                <div className="text-body-02 mb-1">계좌번호</div>
                <CustomInput placeholder="계좌번호를 입력해 주세요" />
            </div>
        </div>
    );
}
