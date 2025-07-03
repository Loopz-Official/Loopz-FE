'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import BottomButton from '@/components/common/BottomButton';
import ChipList from '@/components/features/filter/ChipList';
import PriceRange from '@/components/features/filter/PriceRange';
import Header from '@/components/layouts/Header';
import { filterList } from '@/constants/filterList';

interface SelectedFilter {
    title: string;
    chip: string;
}

export default function Page() {
    const [selectedFilter, setSelectedFilter] = useState<SelectedFilter[]>([]);
    const router = useRouter();

    const toQueryParams = (selected: SelectedFilter[]) => {
        const params = selected
            .map(({ title, chip }) => `${title}=${chip}`)
            .join('&');
        return params ? `?${params}` : '';
    };

    const handleChipClick = (title: string, chip: string) => {
        const newSelected = { title, chip };
        setSelectedFilter([...selectedFilter, newSelected]);
    };

    const handleConfirmButtonClick = () => {
        const params = toQueryParams(selectedFilter);
        router.push(`/main${params}`);
    };

    return (
        <div>
            <Header type="title" title="필터" />
            <div className="space-y-8 px-5 py-6">
                {filterList.map(({ title, chips }) => (
                    <div key={title.label}>
                        <h3 className="text-body-03 font-semibold">
                            {title.label}
                        </h3>
                        {chips ? (
                            <ChipList
                                onClick={(chip) =>
                                    handleChipClick(title.value, chip)
                                }
                                key={title.label}
                                chips={chips}
                            />
                        ) : (
                            <PriceRange />
                        )}
                    </div>
                ))}
            </div>
            <BottomButton
                text="결과보기"
                isDisabled={false}
                onClick={handleConfirmButtonClick}
            >
                <button className="text-body-03 border-button-gray-regular mr-2 h-full w-[6.875rem] items-center justify-center rounded-sm border">
                    초기화
                </button>
            </BottomButton>
        </div>
    );
}
