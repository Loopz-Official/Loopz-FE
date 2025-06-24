export interface Agreement {
    title: string;
    href: string;
    checked: boolean;
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
