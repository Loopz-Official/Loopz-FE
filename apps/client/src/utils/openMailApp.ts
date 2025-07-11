export const openMailApp = (email: string) => {
    const win = window.open(`mailto:${email}`, '_blank', 'noopener,noreferrer');
    if (win) {
        win.opener = null;
    }
};
