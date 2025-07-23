import { mergeCookieValues } from './mergeCookieValues';

export type AuthCookies = {
    accessToken: string;
    enabled: boolean;
    nickName: string | null;
};

export const setAuthCookies = (partial: Partial<AuthCookies>) => {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7일
    const merged = mergeCookieValues(partial);

    document.cookie = `access-token=${merged.accessToken || ''}; path=/; expires=${expires.toUTCString()};`;
    document.cookie = `enabled=${merged.enabled ?? ''}; path=/; expires=${expires.toUTCString()};`;
    document.cookie = `nickname=${merged.nickName || 'null'}; path=/; expires=${expires.toUTCString()};`;
};
