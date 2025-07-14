export const LIKE_TABS = ['OBJECT', 'SNAP'] as const;
export type LikeTab = (typeof LIKE_TABS)[number];

// Like 아이콘 스타일 상수
export const LIKE_ICON_STYLE_LIKED = { fill: '#FF5A2D', stroke: '#FF5A2D' };
export const LIKE_ICON_STYLE_UNLIKED = { fill: '#00000008', stroke: '#FFFFFF' };
