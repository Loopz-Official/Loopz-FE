export const LIKE_TABS = ['OBJECT', 'SNAP'] as const;
export type LikeTab = (typeof LIKE_TABS)[number];
