export const joinValuesWithComma = (values: Set<string> | string[]): string => {
    return Array.from(values).join(',');
};
