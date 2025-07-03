'use client';

import BottomButton from '@/components/common/BottomButton';
import ChipList from '@/components/features/filter/ChipList';
import PriceRange from '@/components/features/filter/PriceRange';
import Header from '@/components/layouts/Header';
import { filterList } from '@/constants/filterList';

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
            <BottomButton text="결과보기" isDisabled={false} onClick={() => {}}>
                <button className="text-body-03 border-button-gray-regular mr-2 h-full w-[6.875rem] items-center justify-center rounded-sm border">
                    초기화
                </button>
            </BottomButton>
        </div>
    );
}
