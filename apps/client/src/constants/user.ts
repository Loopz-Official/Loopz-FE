import { MyAccountInfo } from '@/schemas/user';

export const SOCIAL_LOGIN_TYPE_LABEL: Record<
    MyAccountInfo['socialLoginType'],
    string
> = {
    GOOGLE: '구글',
    KAKAO: '카카오',
    NAVER: '네이버',
};
