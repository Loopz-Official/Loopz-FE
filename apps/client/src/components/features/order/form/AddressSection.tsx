'use client';

import { useState } from 'react';

const DELIVERY_REQUESTS = [
    '문 앞에 놓아주세요.',
    '부재 시 경비실에 맡겨주세요.',
    '택배함에 넣어주세요.',
    '파손 위험 상품입니다. 배송 시 주의해 주세요.',
    '배송 전에 꼭 연락 주세요.',
    '직접 입력',
];

export default function AddressSection() {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [requestContent, setRequestContent] = useState<string | null>(null);
    const isTextareaOpen = requestContent === DELIVERY_REQUESTS.at(-1);

    return (
        <>
            <header className="flex items-center justify-between">
                <h2 className="text-body-01 font-semibold">배송지 정보</h2>
                <button className="text-caption-01 rounded-xs border-gray-regular flex w-[3.375rem] items-center justify-center border py-1">
                    변경
                </button>
            </header>

            <div className="space-y-1.5">
                <div className="flex items-center gap-1">
                    <span className="text-body-03 font-semibold">이예나</span>
                    <span className="text-caption-01 text-point font-semibold">
                        기본 배송지
                    </span>
                </div>
                <div className="text-caption-01 tracking-normal">
                    [09876] 서울특별시 영등포구 도신로 29길 28, 103동 801호
                </div>
                <div className="text-caption-01 tracking-normal">
                    010-XXXX-XXXX
                </div>
            </div>

            {/* 배송 요청사항 */}
            <div>
                <button
                    onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                    className={`${isOptionsOpen || isTextareaOpen ? 'rounded-t-xs' : 'rounded-xs'} border-gray-regular text-caption-01 w-full border transition-[max-height]`}
                >
                    <div
                        className={`${requestContent ? 'text-black' : 'text-disabled'} flex items-center justify-between px-3 py-2.5`}
                    >
                        {requestContent || '배송 요청사항 선택'}
                        <div className="h-4 w-4 bg-black" />
                    </div>
                </button>
                {isOptionsOpen && (
                    <div className="border-gray-regular rounded-b-xs text-caption-01 flex flex-col border border-t-0">
                        {DELIVERY_REQUESTS.map((request) => (
                            <button
                                key={request}
                                onClick={() => {
                                    setRequestContent(request);
                                    setIsOptionsOpen(false);
                                }}
                                className="active:bg-gray-regular w-full px-4 py-2.5 text-left transition-colors"
                            >
                                {request}
                            </button>
                        ))}
                    </div>
                )}
                {isTextareaOpen && (
                    <textarea
                        maxLength={50}
                        placeholder="내용을 입력해 주세요. (최대 50자)"
                        className="h-26 placeholder:text-disabled text-caption-01 border-gray-regular rounded-b-xs flex w-full resize-none flex-col border border-t-0 p-4 outline-none"
                    />
                )}
            </div>
        </>
    );
}
