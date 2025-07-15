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
