import Header from '@/components/layouts/Header';

const PRIVACY_AGREEMENT = [
    {
        title: '회원가입 및 관리',
        perpose:
            '회원가입 의사 확인, 회원제 서비스 제공 에 따른 본인 식별·인증, 연령인증, 회원자격 유지·관리, 서비스 부정이용 방지, 각종고지·통지',
        item: '이메일, 이름, 휴대폰 번호, SNS 간편가입 업체의 사용자별 고유키',
        period: '회원 탈퇴 후 3개월까지\n※ 단 관계법령 위반에 따른 수사, 조사등이 진행 중인 경우에는 해당 수사, 조사 종료시까지',
    },
    {
        title: '결제 및 배송 서비스',
        perpose:
            '상품(서비스) 배송(전송), 반품, 고객상담 등 구매계약의 이행을 위해 필요한 업무의 처리',
        item: '구매자 정보(이메일, 이름, 휴대폰 번호), 수령인 정보(이름, 휴대폰 번호, 배송 주소), 주문정보\n\n-신용카드 결제 시 : 카드사명, 카드번호\n-계좌이체 시: 예금주명, 계좌번호, 은행명\n-휴대폰 결제 시 : 통신사, 휴대폰번호',
        period: '동의철회 또는 회원 탈퇴시까지\n※ 단, 법정 의무 보유기간에 따라 보관',
    },
    {
        title: '고충처리',
        perpose:
            '고객의 신원 확인, 고충사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보',
        item: '이름, 휴대폰 번호, 이메일, 배송주소, 상담 내용, 주문 정보',
        period: '회원 탈퇴시까지\n※ 단, 법정 의무 보유기간에 따라 보관',
    },
    {
        title: '결제 프로세스',
        perpose: '결제업무 처리',
        item: '[필수] 성명, 생년월일, 주소, 전화번호, 이메일 주소, 결제수단 정보(신용카드 번호, 유효기간, 카드 소유자명, 은행 계좌 정보, 계좌주명)',
        period: '동의철회 또는 회원 탈퇴시까지\n※ 단, 법정 의무 보유기간에 따라 보관',
    },
];

export default function Page() {
    return (
        <div>
            <Header
                type="pop-up"
                title="개인정보 수집 및 이용 동의"
                redirectUrl="back"
            />

            <div className="pb-25 text-caption-01 flex flex-col gap-[2.125rem] px-5 pt-4">
                <div>
                    LOOPStory는 아래의 목적으로 개인정보를 수집∙이용 및
                    제3자에게 제공하며, 회원의 소중한 개인정보를 보호함으로써
                    안심하고 서비스를 이용할 수 있도록 최선을 다합니다.
                </div>

                <table className="text-caption-02 border-disabled w-full table-fixed border">
                    <colgroup>
                        <col className="w-1/4" />
                        <col className="w-1/4" />
                        <col className="w-1/4" />
                        <col className="w-1/4" />
                    </colgroup>

                    <thead className="font-medium">
                        <tr className="bg-gray-11">
                            <th className="border-disabled border px-2 py-1">
                                세부 서비스
                            </th>
                            <th className="border-disabled border px-2 py-1">
                                수집 목적
                            </th>
                            <th className="border-disabled border px-2 py-1">
                                수집 항목
                            </th>
                            <th className="border-disabled border px-2 py-1">
                                보유 및 이용기간
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {PRIVACY_AGREEMENT.map((item) => (
                            <tr key={item.title}>
                                <td className="border-disabled border px-2 pb-5 pt-2.5 align-top">
                                    {item.title}
                                </td>
                                <td className="border-disabled border px-2 pb-5 pt-2.5 align-top">
                                    {item.perpose}
                                </td>
                                <td className="border-disabled border px-2 pb-5 pt-2.5 align-top">
                                    {item.item}
                                </td>
                                <td className="border-disabled text-caption-01 whitespace-pre-line border px-2 pb-5 pt-2.5 align-top font-semibold">
                                    {item.period}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div>
                    귀하는 위의 개인정보 수집∙이용에 대해 동의를 거부할 권리가
                    있습니다. 그러나 동의를 거부할 경우 회원가입이 어려울 수
                    있습니다.
                </div>
            </div>
        </div>
    );
}
