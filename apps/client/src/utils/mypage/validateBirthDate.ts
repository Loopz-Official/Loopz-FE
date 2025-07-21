export const validateBirthDate = (value: string) => {
    const [year, month, day] = value.split('-').map(Number);
    if (year == null || month == null || day == null)
        return '생년월일 형식이 올바르지 않습니다.';

    if (year < 1900 || year > 2100) {
        return '연도는 1900년에서 2100년 사이여야 합니다.';
    } else if (month < 1 || month > 12) {
        return '월은 1월에서 12월 사이여야 합니다.';
    } else if (day < 1 || day > 31) {
        return '일은 1일에서 31일 사이여야 합니다.';
    } else {
        return '';
    }
};
