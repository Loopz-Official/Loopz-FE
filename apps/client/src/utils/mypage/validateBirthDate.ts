export const validateBirthDate = (value: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return '생년월일 형식이 올바르지 않습니다. (YYYY-MM-DD)';
    }

    const [year, month, day] = value.split('-').map(Number) as [
        number,
        number,
        number,
    ];

    const date = new Date(year, month - 1, day);
    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return '유효하지 않은 날짜입니다.';
    }

    if (year < 1900 || year > new Date().getFullYear()) {
        return `연도는 1900년에서 ${new Date().getFullYear()}년 사이여야 합니다.`;
    }

    return '';
};
