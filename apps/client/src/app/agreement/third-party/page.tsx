import Header from '@/components/layouts/Header';

const THIRD_PARTY_ITEM = [
    {
        id: 'provider',
        text: '제공받는 자: LOOPStory 이용 항목: 받는 사람 이름, 주소, 우편 번호, 휴대폰 전화번호, 배송 메모, ID(이메일)',
    },
    {
        id: 'purpose',
        text: '이용 목적: 구매한 제품의 배송, 반품, 고객 상담, AS 등 불만 처리, 혜택 제공, 상품 및 판매 관리 업무 등',
    },
    {
        id: 'retention',
        text: '보유 및 이용기간: 서비스 제공 기간 (단, 관련 법령에 의거하여 보존할 필요가 있는 경우 사전 동의를 득한 해당 보존 기간)',
    },
];

export default function Page() {
    return (
        <div>
            <Header
                type="pop-up"
                title="개인정보 제3자 제공 동의"
                redirectUrl="back"
            />

            <div className="text-caption-01 space-y-6 px-5 py-4">
                <div>
                    회사는 결제 서비스 제공을 위하여 아래와 같이 개인정보를
                    제3자에게 제공합니다.
                </div>

                <ul className="ml-3 list-disc space-y-6 marker:text-[8px]">
                    {THIRD_PARTY_ITEM.map((item) => (
                        <li key={item.id}>{item.text}</li>
                    ))}
                </ul>

                <div>
                    ※ 이용자는 위 제공에 동의하지 않을 권리가 있으며, 동의 거부
                    시 결제 서비스 이용이 제한될 수 있습니다.
                </div>
            </div>
        </div>
    );
}
