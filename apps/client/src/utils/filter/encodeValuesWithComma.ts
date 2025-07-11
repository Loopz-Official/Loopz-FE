export const encodeValuesWithComma = (
    values: Set<string> | string[]
): string => {
    const joinedValues = Array.from(values).join(',');
    return encodeURIComponent(joinedValues);
};
