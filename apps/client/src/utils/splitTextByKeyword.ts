export const splitTextByKeyword = (keyword: string, target: string) => {
    if (!target || !keyword) {
        return [target]; // target이나 keyword가 없으면 원본 문자열을 그대로 배열에 담아 반환
    }

    // 정규 표현식에서 특수문자를 이스케이프 처리
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedKeyword})`, 'gi');

    const parts: string[] = [];
    let lastIndex = 0;
    let match;

    // regex.exec()를 사용하여 모든 일치 항목을 찾고, 일치하지 않는 부분도 함께 처리
    while ((match = regex.exec(target)) !== null) {
        // 일치하는 부분 앞의 텍스트 (하이라이트되지 않을 부분)
        if (match.index > lastIndex) {
            parts.push(target.substring(lastIndex, match.index));
        }

        // 일치하는 부분 (하이라이트될 부분)
        parts.push(match[0]);

        lastIndex = regex.lastIndex; // 다음 검색 시작 위치 업데이트
    }

    // 마지막 일치 항목 뒤의 텍스트 (하이라이트되지 않을 부분)
    if (lastIndex < target.length) {
        parts.push(target.substring(lastIndex));
    }

    return parts;
};
