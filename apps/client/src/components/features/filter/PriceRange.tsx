/* eslint-disable react/prop-types */
'use client';

import { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

export default function PriceRange() {
    const STEP = 1000;
    const MIN = 0;
    const MAX = 700000;
    const [values, setValues] = useState([MIN, MAX]);

    const minPrice = (
        Math.floor((values[0] ?? MIN) / 1000) * 1000
    )?.toLocaleString();
    const maxPrice = (
        Math.ceil((values[1] ?? MAX) / 1000) * 1000
    )?.toLocaleString();

    const handlePriceInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        // TODO: 숫자 외 입력 예외처리 필요

        const newValues =
            index === 0
                ? [Number(e.target.value.replace(/,/g, '')), values[1] ?? MAX]
                : [values[0] ?? MIN, Number(e.target.value.replace(/,/g, ''))];

        setValues(newValues);
    };

    return (
        <div className="py-2">
            <div className="text-caption-01 text-gray-regular mb-4">
                가격은 천 원 단위로 입력해 주세요.
            </div>

            <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(values) => {
                    setValues(values);
                }}
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
                                height: '4px',
                                width: '100%',
                                borderRadius: '2px',
                                background: getTrackBackground({
                                    values,
                                    colors: ['#ccc', '#000', '#ccc'],
                                    min: MIN,
                                    max: MAX,
                                }),
                                alignSelf: 'center',
                            }}
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

            <div className="text-caption-01 text-gray-dark grid grid-cols-[1fr_auto_1fr] items-center gap-2.5">
                <div className="flex h-9 items-center gap-1.5 rounded-sm border border-[#d9d9d9] px-4">
                    <input
                        onChange={(e) => handlePriceInputChange(e, 0)}
                        value={minPrice}
                        type="text"
                        className="w-full text-right"
                    />
                    원
                </div>
                ~
                <div className="flex h-9 items-center gap-1.5 rounded-sm border border-[#d9d9d9] px-4">
                    <input
                        onChange={(e) => handlePriceInputChange(e, 1)}
                        value={maxPrice}
                        type="text"
                        className="w-full text-right"
                    />
                    원
                </div>
            </div>
        </div>
    );
}
