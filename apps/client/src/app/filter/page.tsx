'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import BottomButton from '@/components/common/BottomButton';
import ChipList from '@/components/features/filter/ChipList';
import PriceRange from '@/components/features/filter/PriceRange';
import Header from '@/components/layouts/Header';
import { filterList } from '@/constants/filterList';

export interface SelectedFilter {
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
        const doesExist = selectedFilter.some(
            (item) => item.title === title && item.chip === chip
        );

        if (doesExist) {
            // 이미 있으면 제거
            setSelectedFilter(
                selectedFilter.filter(
                    (item) => !(item.title === title && item.chip === chip)
                )
            );
        } else {
            // 없으면 추가
            setSelectedFilter([...selectedFilter, { title, chip }]);
        }
    };

    const setPriceFilter = (priceMin: number, priceMax: number) => {
        // 기존에 price 관련 필터가 있다면 제거
        const filterWithoutPrice = selectedFilter.filter(
            (item) => item.title !== 'priceMin' && item.title !== 'priceMax'
        );

        const priceMinFilter: SelectedFilter = {
            title: 'priceMin',
            chip: priceMin.toString(),
        };
        const priceMaxFilter: SelectedFilter = {
            title: 'priceMax',
            chip: priceMax.toString(),
        };

        setSelectedFilter([
            ...filterWithoutPrice,
            priceMinFilter,
            priceMaxFilter,
        ]);
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
                                selectedChips={selectedFilter.filter(
                                    (item) => item.title === title.value
                                )}
                                chips={chips}
                            />
                        ) : (
                            <PriceRange setPriceFilter={setPriceFilter} />
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
