import { GoogleBadge, KakaoBadge, NaverBadge } from '@/icons/OAuthBadge';
import { MyAccountInfo } from '@/schemas/user';

export const OAUTH_BADGE: Record<
    MyAccountInfo['socialLoginType'],
    React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined
> = {
    GOOGLE: GoogleBadge,
    KAKAO: KakaoBadge,
    NAVER: NaverBadge,
};

export const GENDERS = [
    {
        label: 'MALE',
        value: '남성',
        checked: false,
    },
    {
        label: 'FEMAIL',
        value: '여성',
        checked: false,
    },
    {
        label: 'UNKNOWN',
        value: '선택하지 않음',
        checked: false,
    },
] as const;
