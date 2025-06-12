import { RefObject } from 'react';

export const calculatePeekWidth = (slideRef: RefObject<HTMLDivElement>) => {
    // 뷰포트 길이
    const viewportWidth = window.innerWidth;

    // 프레임 width (max width 672px)
    const frameWidth = Math.min(viewportWidth, 672);

    // 슬라이드 하나의 길이
    const slideWidth = slideRef.current.getBoundingClientRect().width;

    // 슬라이드 사이 간격 추가
    const slideWidthWithGap = slideWidth + 12;

    // 오른쪽으로 엿보이는 슬라이드 크기
    const peekWidth = (frameWidth - slideWidthWithGap) / 2;

    return peekWidth;
};
