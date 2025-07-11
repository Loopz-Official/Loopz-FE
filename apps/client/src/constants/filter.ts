export const PRICE_MIN = 0;
export const PRICE_MAX = 700000;
export const RANGE_STEP = 1000;

// 필터 타입 정의
type FilterType = 'single' | 'multi' | 'range';

export interface Chip {
    label: string;
    value: string;
}

interface FilterConfigItem {
    label: string;
    type: FilterType;
    chips?: Chip[]; // 가격 필터는 chips 없음
}

export type FilterConfig = {
    [key: string]: FilterConfigItem;
};

export const FILTER_CONFIG: FilterConfig = {
    excludeSoldOut: {
        label: '상품 정보',
        type: 'single',
        chips: [{ label: '품절상품 제외', value: 'true' }],
    },
    objectTypes: {
        label: '제품 유형',
        type: 'multi',
        chips: [
            { label: '가구', value: 'FURNITURE' },
            { label: '조명', value: 'LIGHT' },
            { label: '오브제 / 소품', value: 'PROPS' },
            { label: '화병 / 화분', value: 'FLOWERPOT' },
            { label: '전자기기', value: 'TECH' },
            { label: '예술 / 아트', value: 'ART' },
        ],
    },
    objectSizes: {
        label: '제품 크기',
        type: 'multi',
        chips: [
            { label: '소형', value: 'SMALL' },
            { label: '중형', value: 'MEDIUM' },
            { label: '대형', value: 'LARGE' },
        ],
    },
    price: {
        label: '가격대',
        type: 'range',
    },
    keywords: {
        label: '키워드',
        type: 'multi',
        chips: [
            { label: '감성적인', value: 'EMOTIONAL' },
            { label: '실용적인', value: 'PRACTICAL' },
            { label: '트렌디한', value: 'TRENDY' },
            { label: '레트로한', value: 'RETRO' },
            { label: '유니크한', value: 'UNIQUE' },
            { label: '미니멀한', value: 'MINIMAL' },
            { label: '심플한', value: 'SIMPLE' },
            { label: '심오한', value: 'PROFOUND' },
            { label: '거대한', value: 'LARGE' },
            { label: '아기자기한', value: 'CHARMING' },
        ],
    },
} as const;
