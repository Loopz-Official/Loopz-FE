/* eslint-disable react/prop-types */
'use client';

import { useEffect, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import { useDebouncedCallback } from 'use-debounce';

import { PRICE_MAX, PRICE_MIN, RANGE_STEP } from '@/constants/filter';

export default function PriceRange({
    initialMin,
    initialMax,
    setPriceFilter,
}: {
    initialMin: number;
    initialMax: number;
    setPriceFilter: (priceMin: number, priceMax: number) => void;
}) {
    const [values, setValues] = useState([PRICE_MIN, PRICE_MAX]);
    const [inputValues, setInputValues] = useState([
        PRICE_MIN.toLocaleString(),
        PRICE_MAX.toLocaleString(),
    ]);

    useEffect(() => {
        const initialPrice = [PRICE_MIN, PRICE_MAX];

        if (!isNaN(initialMin)) {
            initialPrice[0] = initialMin;
        }
        if (!isNaN(initialMax)) {
            initialPrice[1] = initialMax;
        }

        setValues(initialPrice);
        setInputValues(initialPrice.map((price) => price.toLocaleString()));
    }, [initialMin, initialMax]);

    // range 슬라이더 디바운스
    // min이 max보다 크면 슬라이더 조작 시 swap
    const debouncedSetValues = useDebouncedCallback(
        (minNum: number, maxNum: number) => {
            if (minNum > maxNum) [minNum, maxNum] = [maxNum, minNum];
            setValues([minNum, maxNum]);
            setPriceFilter(minNum, maxNum);
        },
        300
    );

    const debouncedSetPriceFilter = useDebouncedCallback(
        (minNum: number, maxNum: number) => setPriceFilter(minNum, maxNum),
        300
    );

    const handlePriceInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        // 숫자와 쉼표(,) 이외 입력이 있으면 return
        if (/[^0-9,]/.test(e.target.value)) return;
        // 입력값에서 숫자만 추출
        const raw = e.target.value.replace(/[^0-9]/g, '');

        // inputValues는 즉시 업데이트
        const newInputValues = [...inputValues];
        newInputValues[index] = Number(raw || '0').toLocaleString();
        setInputValues([newInputValues[0] || '0', newInputValues[1] || '0']);

        if (raw === '') return;
        let num = Number(raw);

        // num이 범위 내에 있도록 보정
        if (num < PRICE_MIN) num = PRICE_MIN;
        if (num > PRICE_MAX) num = PRICE_MAX;

        const minNum =
            index === 0
                ? num
                : Number((inputValues[0] ?? '0').replace(/,/g, ''));
        const maxNum =
            index === 1
                ? num
                : Number((inputValues[1] ?? '0').replace(/,/g, ''));

        debouncedSetValues(minNum, maxNum);
    };

    // 슬라이더 조작 시 inputValues도 동기화
    const handleRangeChange = (vals: number[]) => {
        const minNum = vals[0] ?? PRICE_MIN;
        const maxNum = vals[1] ?? PRICE_MAX;

        setValues([minNum, maxNum]);
        setInputValues([minNum.toLocaleString(), maxNum.toLocaleString()]);

        debouncedSetPriceFilter(minNum, maxNum);
    };

    return (
        <div className="py-2">
            <div className="text-caption-01 text-gray-regular mb-4">
                최대 700,000원까지 입력 가능해요.
            </div>

            <Range
                values={values}
                step={RANGE_STEP}
                min={PRICE_MIN}
                max={PRICE_MAX}
                onChange={handleRangeChange}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            height: '36px',
                            display: 'flex',
                            width: '100%',
                        }}
                    >
                        <div
                            ref={props.ref}
                            style={{
                                position: 'relative',
                                height: '4px',
                                width: '100%',
                                borderRadius: '2px',
                                margin: '0 10px',
                                background: getTrackBackground({
                                    values,
                                    colors: ['#ccc', '#000', '#ccc'],
                                    min: PRICE_MIN,
                                    max: PRICE_MAX,
                                }),
                                alignSelf: 'center',
                            }}
                            className="before:absolute before:-left-3 before:-right-3 before:bottom-0 before:top-0 before:-z-10 before:rounded-full before:bg-[#ccc]"
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        key={props.key}
                        style={{
                            ...props.style,
                        }}
                        className="h-6 w-6 rounded-full border border-[#d9d9d9] bg-white shadow-sm outline-0"
                    ></div>
                )}
            />

            <div className="text-caption-01 grid grid-cols-[1fr_auto_1fr] items-center gap-2.5">
                <div className="flex h-9 items-center gap-1.5 rounded-sm border border-[#d9d9d9] px-4">
                    <input
                        onChange={(e) => handlePriceInputChange(e, 0)}
                        value={inputValues[0]}
                        type="text"
                        className="text-gray-dark w-full text-right"
                        inputMode="numeric"
                        pattern="[0-9]*"
                    />
                    원
                </div>
                ~
                <div className="flex h-9 items-center gap-1.5 rounded-sm border border-[#d9d9d9] px-4">
                    <input
                        onChange={(e) => handlePriceInputChange(e, 1)}
                        value={inputValues[1]}
                        type="text"
                        className="text-gray-dark w-full text-right"
                        inputMode="numeric"
                        pattern="[0-9]*"
                    />
                    원
                </div>
            </div>
        </div>
    );
}
