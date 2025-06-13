'use client';

import Header from '../../components/common/Header';
import ChipList from '../../components/features/filter/ChipList';
import PriceRange from '../../components/features/filter/PriceRange';

const filterList = [
    {
        title: '상품 정보',
        chips: ['품절상품 제외'],
    },
    {
        title: '제품 유형',
        chips: [
            '가구',
            '조명',
            '디스플레이 집기',
            '오브제 / 소품',
            '화병 / 화분',
            '라이프스타일 테크',
            '예술 / 아트',
        ],
    },
    {
        title: '제품 크기',
        chips: ['소형', '중형', '대형'],
    },
    {
        title: '가격대',
    },
    {
        title: '키워드',
        chips: [
            '감성적인',
            '실용적인',
            '트렌디한',
            '레트로한',
            '유니크한',
            '미니멀한',
            '심플한',
            '심오한',
            '거대한',
            '아기자기한',
        ],
    },
];

export default function Page() {
    return (
        <div>
            <Header type="title" title="필터" />
            <div className="space-y-8 px-5 py-6">
                {filterList.map(({ title, chips }) => (
                    <div key={title}>
                        <h3 className="text-body-03 font-semibold">{title}</h3>
                        {chips ? (
                            <ChipList key={title} chips={chips} />
                        ) : (
                            <PriceRange />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
