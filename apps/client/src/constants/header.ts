import * as I from '@/icons/Header';

const BACK_BUTTON = {
    label: '뒤로가기',
    icon: I.BackIcon,
    className: 'w-7 h-7',
};

export const LEFT_SIDE_OPTIONS = {
    main: {
        label: 'Loopz',
        icon: I.LoopzIcon,
        className: 'w-[4.0625rem] h-7',
    },
    sub: BACK_BUTTON,
    title: BACK_BUTTON,
    'pop-up': {
        label: '닫기',
        icon: I.CloseIcon,
        className: 'w-7 h-7',
    },
};

export const RIGHT_SIDE_OPTIONS = [
    // {
    //     label: '검색',
    //     icon: I.SearchIcon,
    //     route: '/search',
    // },
    {
        label: '장바구니',
        icon: I.CartIcon,
        route: '/cart',
    },
];
