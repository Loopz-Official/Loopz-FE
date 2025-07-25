export const getCookie = (name: string): string | undefined => {
    const match = document.cookie.match(
        new RegExp('(^| )' + name + '=([^;]+)')
    );

    if (match && match[2] !== undefined) {
        return decodeURIComponent(match[2]);
    }
    return undefined;
};
