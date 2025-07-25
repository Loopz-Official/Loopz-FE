export function formatDate(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat().format(date);
}
