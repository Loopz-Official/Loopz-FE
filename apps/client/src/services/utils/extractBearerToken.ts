export const extractBearerToken = (
    authHeader: string
): string | null | undefined => {
    return authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null;
};
