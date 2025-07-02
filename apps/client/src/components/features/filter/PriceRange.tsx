/* eslint-disable react/prop-types */
'use client';

import { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

export default function PriceRange() {
    const STEP = 1000;
    const MIN = 0;
    const MAX = 700000;
    const [values, setValues] = useState([MIN, MAX]);

    const minInput = (values[0] ?? MIN).toLocaleString();
    const maxInput = (values[1] ?? MAX).toLocaleString();

    const handlePriceInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        // 숫자와 쉼표(,) 이외 입력이 있으면 return
        if (/[^0-9,]/.test(e.target.value)) return;

        // 입력값에서 숫자만 추출
        const raw = e.target.value.replace(/[^0-9]/g, '');

        let num = Number(raw);

        // num이 범위 내에 있도록 보정
        if (num < MIN) num = MIN;
        if (num > MAX) num = MAX;

        const newValues =
            index === 0 ? [num, values[1] ?? MAX] : [values[0] ?? MIN, num];

        // min이 max보다 커지지 않도록 보정
        let safeMin = newValues[0] ?? MIN;
        let safeMax = newValues[1] ?? MAX;
        if (safeMin > safeMax) {
            if (index === 0) safeMax = safeMin;
            else safeMin = safeMax;
        }

        setValues([safeMin, safeMax]);
    };

    return (
        <div className="py-2">
            <div className="text-caption-01 text-gray-regular mb-4">
                최대 700,000원까지 입력 가능해요.
            </div>

            <Range
                values={values}
                step={STEP}
                min={MIN}
                max={MAX}
                onChange={(values) => setValues(values)}
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
                                    min: MIN,
                                    max: MAX,
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
                        value={minInput}
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
                        value={maxInput}
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
