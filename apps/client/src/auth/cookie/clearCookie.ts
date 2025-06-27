export const clearUserInfoCookie = () => {
    document.cookie = 'enabled=; Max-Age=0; path=/;';
    document.cookie = 'nickname=; Max-Age=0; path=/;';
    document.cookie = 'access-token=; Max-Age=0; path=/;';
};
