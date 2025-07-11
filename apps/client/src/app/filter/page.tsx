'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import BottomButton from '@/components/common/BottomButton';
import ChipList from '@/components/features/filter/ChipList';
import PriceRange from '@/components/features/filter/PriceRange';
import Header from '@/components/layouts/Header';
import { FILTER_CONFIG, PRICE_MAX, PRICE_MIN } from '@/constants/filter';
import { PriceFilter, SelectedChipsMap } from '@/types/filter';
import { parseQueryParams } from '@/utils/filter/parseQueryParams';
import { toQueryParams } from '@/utils/filter/toQueryParams';
import { toSelectedFilterArray } from '@/utils/filter/toSelectedFilterArray';

export default function ObjectFilterPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // chips 선택 상태: { [key: string]: Set<string> }
    const [selectedChips, setSelectedChips] = useState<SelectedChipsMap>({});

    // 가격대 상태를 하나의 객체로 묶어서 관리
    const [price, setPrice] = useState<PriceFilter>({
        min: PRICE_MIN,
        max: PRICE_MAX,
    });

    // 쿼리스트링 → 상태 동기화
    useEffect(() => {
        const { selectedChips: parsedChips, price: parsedPrice } =
            parseQueryParams(searchParams);

        setSelectedChips(parsedChips);
        setPrice({
            min: parsedPrice.min || PRICE_MIN,
            max: parsedPrice.max || PRICE_MAX,
        });
    }, [searchParams]);

    // Chip 선택/해제 핸들러
    const handleChipClick = (title: string, value: string) => {
        setSelectedChips((prev) => {
            const prevSet: Set<string> = prev[title]
                ? new Set(prev[title])
                : new Set();

            if (prevSet.has(value)) {
                prevSet.delete(value);
            } else {
                prevSet.add(value);
            }

            // value가 하나도 없으면 key를 아예 삭제
            if (prevSet.size === 0) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { [title]: _, ...rest } = prev;
                return rest;
            }

            return { ...prev, [title]: prevSet };
        });
    };

    // 가격대 변경 핸들러
    const handlePriceChange = (min: number, max: number) => {
        setPrice({ min, max });
    };

    // 초기화 버튼
    const handleClearButtonClick = () => {
        setSelectedChips({});
        setPrice({ min: PRICE_MIN, max: PRICE_MAX });
    };

    // 결과보기 버튼
    const handleConfirmButtonClick = () => {
        const params = toQueryParams(selectedChips, price);
        router.replace(`/main${params}`);
    };

    return (
        <div>
            <Header type="title" title="필터" />
            <div className="space-y-8 px-5 py-6 pb-24">
                {Object.entries(FILTER_CONFIG).map(([key, config]) => (
                    <div key={key}>
                        <h3 className="text-body-03 font-semibold">
                            {config.label}
                        </h3>
                        {config.type === 'range' ? (
                            <PriceRange
                                initialMin={price.min}
                                initialMax={price.max}
                                setPriceFilter={handlePriceChange}
                            />
                        ) : (
                            <ChipList
                                chips={config.chips || []}
                                selectedChips={toSelectedFilterArray(
                                    selectedChips,
                                    key
                                )}
                                onClick={(chip) => handleChipClick(key, chip)}
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
                    onClick={handleClearButtonClick}
                    className="text-body-03 border-button-gray-regular mr-2 h-full w-[6.875rem] items-center justify-center rounded-sm border"
                >
                    초기화
                </button>
            </BottomButton>
        </div>
    );
}
