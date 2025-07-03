export const filterList = [
    {
        title: { label: '상품 정보', value: 'excludeSoldOut' },
        chips: [{ label: '품절상품 제외', value: 'true' }],
    },
    {
        title: { label: '제품 유형', value: 'objectTypes' },
        chips: [
            { label: '가구', value: 'FURNITURE' },
            { label: '조명', value: 'LIGHT' },
            { label: '오브제 / 소품', value: 'PROPS' },
            { label: '화병 / 화분', value: 'FLOWERPOT' },
            { label: '전자기기', value: 'TECH' },
            { label: '예술 / 아트', value: 'ART' },
        ],
    },
    {
        title: { label: '제품 크기', value: 'objectSizes' },
        chips: [
            { label: '소형', value: 'SMALL' },
            { label: '중형', value: 'MEDIUM' },
            { label: '대형', value: 'LARGE' },
        ],
    },
    {
        title: { label: '가격대', value: 'price' },
    },
    {
        title: { label: '키워드', value: 'keywords' },
        chips: [
            { label: '감성적인', value: 'EMOTIONAL' },
            { label: '실용적인', value: 'PRACTICAL' },
            { label: '트렌디한', value: 'TRVALUEDY' },
            { label: '레트로한', value: 'RETRO' },
            { label: '유니크한', value: 'UNIQUE' },
            { label: '미니멀한', value: 'MINIMAL' },
            { label: '심플한', value: 'SIMPLE' },
            { label: '심오한', value: 'PROFOUND' },
            { label: '거대한', value: 'LARGE' },
            { label: '아기자기한', value: 'CHARMING' },
        ],
    },
];
