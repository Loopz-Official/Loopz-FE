import { useUserInfoStore } from '@/hooks/stores/useUserInfoStore';

export const setUserInfoCookie = () => {
    document.cookie = `enabled=${useUserInfoStore.getState().enabled}; path=/;`;
    document.cookie = `nickname=${useUserInfoStore.getState().nickName}; path=/;`;
};

export const setTokenCookie = (token: string) => {
    document.cookie = `access-token=${token}; path=/;`;
};
