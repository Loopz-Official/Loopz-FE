import * as I from '@/icons/Auth';

export const OAUTH_SERVICES = [
    {
        name: '카카오',
        icon: I.KakaoLogo,
        url: '/api/auth/kakao',
        bgColor: '#FEE500',
    },
    {
        name: '네이버',
        icon: I.NaverLogo,
        url: '/api/auth/naver',
        bgColor: '#03C75A',
    },
    {
        name: 'Google',
        icon: I.GoogleLogo,
        url: '/api/auth/google',
        bgColor: '#FFFFFF',
        borderColor: '#E3E3E3',
    },
];
