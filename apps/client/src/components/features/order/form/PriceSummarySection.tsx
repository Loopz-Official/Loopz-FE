'use client';

import { useState } from 'react';

export default function PriceSummarySection() {
    const [isDetailOpen, setIsDetailOpen] = useState(true);
    return (
        <>
            <header className="flex justify-between">
                <h2 className="text-headline-04">결제 금액</h2>
                <button
                    onClick={() => setIsDetailOpen(!isDetailOpen)}
                    className="flex items-center gap-2"
                >
                    <span className="text-headline-04 text-point">
                        24,000원
                    </span>
                    <div className="h-4 w-4 bg-black" />
                </button>
            </header>

            <div
                className={`overflow-hidden transition-[max-height] duration-300 ${isDetailOpen ? 'max-h-100' : 'max-h-0'}`}
            >
                <hr className="border-gray-light my-4" />

                <div className="text-body-03 text-gray-dark space-y-1.5 font-normal">
                    <div className="flex justify-between">
                        <span>총 상품 금액</span>
                        <span>21,000원</span>
                    </div>
                    <div className="flex justify-between">
                        <span>배송비</span>
                        <span>3,000원</span>
                    </div>
                </div>

                <hr className="border-gray-light my-4" />

                <footer className="mb-2 flex justify-between">
                    <h2 className="text-body-01 font-semibold">총 결제 금액</h2>
                    <span className="text-body-01 font-semibold">24,000원</span>
                </footer>
            </div>
        </>
    );
}
