import { getCookie } from './getCookie';
import { AuthCookies } from './setCookie';

export const mergeCookieValues = (
    partial: Partial<AuthCookies>
): AuthCookies => {
    // 기존 쿠키 값 읽기
    const accessToken = getCookie('access-token') || '';
    const enabledRaw = getCookie('enabled');
    const enabled = enabledRaw === undefined ? false : enabledRaw === 'true';
    const nickNameRaw = getCookie('nickname');
    const nickName =
        nickNameRaw === undefined || nickNameRaw === 'null'
            ? null
            : nickNameRaw;

    // 병합
    return {
        accessToken: partial.accessToken ?? accessToken,
        enabled: partial.enabled ?? enabled,
        nickName: partial.nickName ?? nickName,
    };
};
