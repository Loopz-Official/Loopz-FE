export const MYPAGE_LINKS = [
    {
        label: '주문 내역',
        href: '/mypage/order-list',
    },
    {
        label: '취소/반품 내역',
        href: '/mypage/return-list',
    },
    {
        label: '회원 정보 수정',
        href: '/mypage/edit',
    },
    {
        label: '1:1 문의하기',
        href: '/mypage/contact',
    },
];

export const MYPAGE_BUTTONS = ['로그아웃', '탈퇴하기'] as const;

export const CONTACT_NOTIFICATIONS = [
    { label: '평일', value: '전체 문의 상담' },
    { label: '토요일, 공휴일', value: '배송 주문건 상담' },
    { label: '일요일', value: '휴무' },
];

export const CONTACT_CHANNELS = [
    { label: '카카오톡 문의하기', href: 'https://open.kakao.com/o/sfx6Rvyh' },
    { label: 'DM 문의하기', href: 'https://www.instagram.com/loop_z.official' },
    { label: '이메일 문의하기', href: '' },
];
