import { ServerAuthResponse } from '@/schemas/oauth';

export const setUserInfoCookie = (
    userInfo: ServerAuthResponse,
    accessToken: string
) => {
    document.cookie = `enabled=${userInfo.enabled}; path=/;`;
    document.cookie = `nickname=${userInfo.nickName}; path=/;`;
    document.cookie = `access-token=${accessToken}; path=/;`;
};
