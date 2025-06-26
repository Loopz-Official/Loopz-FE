import * as I from '@/icons/Auth';

const OAUTH_BASE_URL = {
    google: 'https://accounts.google.com/o/oauth2/v2/auth',
};

export const OAUTH_REQUEST_URL = {
    google: `${OAUTH_BASE_URL.google}?response_type=code&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&scope=openid%20email%20profile&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}`,
};

export const OAUTH_GOOGLE_API = 'https://oauth2.googleapis.com';

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
        url: OAUTH_REQUEST_URL.google,
        bgColor: '#FFFFFF',
        borderColor: '#E3E3E3',
    },
];
