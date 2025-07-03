'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import BottomButton from '@/components/common/BottomButton';
import ChipList from '@/components/features/filter/ChipList';
import PriceRange from '@/components/features/filter/PriceRange';
import Header from '@/components/layouts/Header';
import { FILTER_LIST, PRICE_MAX, PRICE_MIN } from '@/constants/filter';

export interface SelectedFilter {
    title: string;
    chip: string;
}

export default function Page() {
    const [selectedFilter, setSelectedFilter] = useState<SelectedFilter[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const queryString = searchParams.toString();
        if (queryString === '') return;

        const titleChipMap = queryString
            .split('&')
            .map((item) => item.split('='));

        const initialSelectedFilter = titleChipMap.map((item) => ({
            title: item[0] ?? '',
            chip: item[1] ?? '',
        }));

        setSelectedFilter(initialSelectedFilter);
    }, [searchParams]);

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

        const price: SelectedFilter[] = [];

        if (priceMin !== PRICE_MIN) {
            // 최솟값이 아닐 때에만 추가
            price.push({
                title: 'priceMin',
                chip: priceMin.toString(),
            });
        }

        if (priceMax !== PRICE_MAX) {
            // 최댓값이 아닐 때에만 추가
            price.push({
                title: 'priceMax',
                chip: priceMax.toString(),
            });
        }

        setSelectedFilter([...filterWithoutPrice, ...price]);
    };

    const handleConfirmButtonClick = () => {
        const params = toQueryParams(selectedFilter);
        router.replace(`/main${params}`);
    };

    const handleClearbuttonClick = () => {
        setSelectedFilter([]);
    };

    return (
        <div>
            <Header type="title" title="필터" />
            <div className="space-y-8 px-5 py-6 pb-24">
                {FILTER_LIST.map(({ title, chips }) => (
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
                            <PriceRange
                                initialMin={Number(
                                    selectedFilter.find(
                                        (item) => item.title === 'priceMin'
                                    )?.chip
                                )}
                                initialMax={Number(
                                    selectedFilter.find(
                                        (item) => item.title === 'priceMax'
                                    )?.chip
                                )}
                                setPriceFilter={setPriceFilter}
                            />
                        )}
                    </div>
                ))}
            </div>

            <BottomButton
                text="결과보기"
                isDisabled={false}
                onClick={handleConfirmButtonClick}
            >
                <button
                    onClick={handleClearbuttonClick}
                    className="text-body-03 border-button-gray-regular mr-2 h-full w-[6.875rem] items-center justify-center rounded-sm border"
                >
                    초기화
                </button>
            </BottomButton>
        </div>
    );
}
