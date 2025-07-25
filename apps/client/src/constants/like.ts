export const LIKE_TABS = ['OBJECT', 'SNAP'] as const;
export type LikeTab = (typeof LIKE_TABS)[number];

// Like 아이콘 사용 페이지 (board & detail)
export const LIKE_ICON_TYPES = ['board', 'detail'] as const;
export type LikeIconType = (typeof LIKE_ICON_TYPES)[number];

// 오브제 좋아요 아이콘 스타일(보드/상세)
export const LIKE_ICON_STYLE_LIKED = {
    board: { fill: '#FF5A2D', stroke: 'none' },
    detail: { fill: '#FF5A2D', stroke: 'none' },
} as const;

export const LIKE_ICON_STYLE_UNLIKED = {
    board: { fill: '#00000008', stroke: '#FFFFFF' },
    detail: { fill: 'none', stroke: '#151515' },
} as const;
