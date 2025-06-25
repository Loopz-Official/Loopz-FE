export interface Agreement {
    title: string;
    href: string;
    checked: boolean;
}

export interface SignupAgreement extends Agreement {
    id: 'over14' | 'agreedServiceTerms' | 'agreedMarketing' | 'agreedEventSMS';
    mandatory: boolean;
}

export const INITIAL_AGREEMENTS: Agreement[] = [
    {
        title: '개인정보 수집/이용 동의',
        href: '',
        checked: false,
    },
    {
        title: '개인정보 제3자 제공 동의',
        href: '',
        checked: false,
    },
];

export const SIGN_UP_AGREEMENTS: SignupAgreement[] = [
    {
        id: 'over14',
        title: '만 14세 이상입니다.',
        mandatory: true,
        href: '',
        checked: false,
    },
    {
        id: 'agreedServiceTerms',
        title: 'Loopz 이용약관 동의',
        mandatory: true,
        href: '',
        checked: false,
    },
    {
        id: 'agreedMarketing',
        title: '개인정보 마케팅 활용 동의',
        mandatory: false,
        href: '',
        checked: false,
    },
    {
        id: 'agreedEventSMS',
        title: '이벤트 및 혜택 안내 메일 및 SMS 수신 동의',
        mandatory: false,
        href: '',
        checked: false,
    },
];
