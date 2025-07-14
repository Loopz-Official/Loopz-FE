import {
    LIKE_ICON_STYLE_LIKED,
    LIKE_ICON_STYLE_UNLIKED,
} from '@/constants/like';

// liked 상태에 따라 Like 아이콘의 스타일 반환

export function getLikeIconStyling(liked: boolean) {
    return liked ? LIKE_ICON_STYLE_LIKED : LIKE_ICON_STYLE_UNLIKED;
}
