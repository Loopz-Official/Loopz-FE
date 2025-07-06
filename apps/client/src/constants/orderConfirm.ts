export const ORDER_CONFIRM_NOTICE =
    '현재 결제 시스템 구축이 진행 중에 있어 부득이하게 계좌이체 방식으로 결제를 받고 있습니다. 이용에 불편을 드려 죄송하며, 더 나은 서비스 환경으로 빠르게 개선하겠습니다';

export const ORDER_CONFIRM_ITEMS = [
    {
        key: '입금자명',
        title: '1. 계좌 이체 시, 입금자명은 받으시는 분의 성함과 <span class="text-point">동일하게</span> 작성해주세요.',
        description:
            '배송지 정보에 있는 받으시는 분의 성함과 동일하게 작성되어 있지 않다면, 확인이 매우 늦어질 수 있습니다.',
    },
    {
        key: '입금진행',
        title: '2. 아래 계좌로 <span class="text-point">입금을 진행</span>해주세요.',
        description:
            '결제 금액을 꼭 확인 후 진행해주세요. <br />계좌번호 : 국민은행 123456-01-234567',
    },
    {
        key: '24시간이내',
        title: '3. 입금 후, <span class="text-point">24시간 이내</span>로만 결제 취소 및 환불이 가능합니다.',
        description: '',
    },
];
