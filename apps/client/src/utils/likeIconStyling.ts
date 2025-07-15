import {
    LIKE_ICON_STYLE_LIKED,
    LIKE_ICON_STYLE_UNLIKED,
    LikeIconType,
} from '@/constants/like';

// liked 상태와 타입(board/detail)에 따라 Like 아이콘의 스타일 반환
export function getLikeIconStyling(type: LikeIconType, liked: boolean) {
    return liked ? LIKE_ICON_STYLE_LIKED[type] : LIKE_ICON_STYLE_UNLIKED[type];
}
