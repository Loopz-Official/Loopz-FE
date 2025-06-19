'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import BottomButton from '@/components/common/BottomButton';
import { PlusIcon } from '@/components/icons/Plus';

export default function Page() {
    const [activeIndex, setActiveIndex] = useState(0);
    const addresses = [0, 1, 2];
    const router = useRouter();

    const handleAddButtonClick = () => {
        if (addresses.length === 10) {
            alert('배송지는 최대 10개까지 등록하실 수 있습니다.');
        } else {
            router.push('/addresses/add');
        }
    };

    const handleSaveButtonClick = () => {
        // address 정보를 전역으로 저장 -> 주문/결제 페이지에서 사용
        router.push('/order/form');
    };

    return (
        <div>
            {/* 헤더 */}

            <div className="flex h-[calc(100vh-180px)] flex-col gap-6 px-5 py-2">
                <button
                    onClick={handleAddButtonClick}
                    className="border-gray-regular flex w-full items-center justify-center gap-1 rounded-[0.25rem] border py-3"
                >
                    <PlusIcon className="h-4 w-4" />
                    배송지 추가
                </button>

                {addresses.map((address, i) => (
                    <div
                        key={address}
                        className="grid grid-cols-[auto_1fr] gap-2"
                    >
                        <input
                            onChange={() => setActiveIndex(i)}
                            checked={activeIndex === i}
                            id={`${address}2345`}
                            type="radio"
                            name="address"
                            className="border-gray-10 before:-translate-1/2 relative m-1 h-4 w-4 appearance-none rounded-full border before:absolute before:left-1/2 before:top-1/2 before:hidden before:h-2.5 before:w-2.5 before:rounded-full before:bg-black checked:border-black checked:before:block"
                        />
                        <label
                            htmlFor={`${address}2345`}
                            className="flex flex-col"
                        >
                            <div className="flex items-center gap-1 font-semibold">
                                <span className="text-body-02">이예나</span>
                                {i === 0 && (
                                    <span className="text-point text-caption-01">
                                        기본 배송지
                                    </span>
                                )}
                            </div>

                            <div className="text-body-03 text-gray-dark mb-1.5 mt-1 flex flex-col gap-0.5 font-normal">
                                <div>
                                    [09876] 서울특별시 영등포구 도신로 29길 28,
                                    103동 801호
                                </div>
                                <div>010-4804-8433</div>
                            </div>

                            <div className="flex gap-1">
                                <button className="border-gray-regular rounded-xs text-caption-01 border px-4 py-1">
                                    수정
                                </button>
                                <button className="border-gray-regular rounded-xs text-caption-01 border px-4 py-1">
                                    삭제
                                </button>
                            </div>
                        </label>
                    </div>
                ))}
            </div>

            <hr className="border-gray-light border-4" />

            <div className="text-disabled text-caption-02 mb-3 mt-5 grid grid-cols-[auto_1fr] gap-0.5 px-5">
                <div className="w-4 text-center font-black">·</div>
                <div>배송지는 최대 10개까지 등록하실 수 있습니다.</div>
            </div>

            <BottomButton
                text="저장하기"
                isDisabled={false}
                onClick={handleSaveButtonClick}
            />
        </div>
    );
}
