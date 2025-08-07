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
    },
    {
        label: 'FEMALE',
        value: '여성',
    },
    {
        label: 'UNKNOWN',
        value: '선택하지 않음',
    },
] as const;

export const LEAVE_REASONS = [
    '재가입을 희망해요.',
    '구매 희망 상품이 없어요.',
    '자주 사용하지 않아요.',
    '상품 배송이 느려요.',
    '상품 탐색이 어려워요.',
    '기타',
];
