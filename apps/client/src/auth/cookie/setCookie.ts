type AuthCookies = {
    accessToken: string;
    enabled: boolean;
    nickName: string | null;
};

export const setAuthCookies = ({
    accessToken,
    enabled,
    nickName,
}: Partial<AuthCookies>) => {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7일

    document.cookie = `access-token=${accessToken}; path=/; expires=${expires.toUTCString()};`;
    document.cookie = `enabled=${enabled}; path=/; expires=${expires.toUTCString()};`;
    document.cookie = `nickname=${nickName || 'null'}; path=/; expires=${expires.toUTCString()};`;
};
