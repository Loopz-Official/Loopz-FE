import { useUserInfo } from '@/hooks/stores/userInfo';

export const setUserInfoCookie = () => {
    document.cookie = `enabled=${useUserInfo.getState().enabled}; path=/;`;
    document.cookie = `nickname=${useUserInfo.getState().nickName}; path=/;`;
};

export const setTokenCookie = (token: string) => {
    document.cookie = `access-token=${token}; path=/;`;
};
