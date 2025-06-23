'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Header from '@/components/layouts/Header';

export default function Page() {
    const [agreements, setAgreements] = useState([false, false, false]);
    const isAllChecked = agreements.every((agreement) => agreement);

    const router = useRouter();

    const handleSingleCheckChange = (index: number) => {
        setAgreements(
            agreements.map((agreement, i) =>
                i === index ? !agreement : agreement
            )
        );
    };

    const renderCheckbox = (index: number) => {
        return (
            <label className="mt-5 flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={agreements[index]}
                    onChange={() => handleSingleCheckChange(index)}
                    className="border-gray-09 rounded-xs not-checked:bg-[url('/unchecked-check.svg')] relative h-5 w-5 appearance-none border bg-center bg-no-repeat checked:border-black checked:bg-black checked:bg-[url('/checked-check.svg')]"
                />
                <span className="text-body-03 text-gray-dark cursor-pointer font-normal">
                    네! 확인했습니다.
                </span>
            </label>
        );
    };

    return (
        <div className="pb-27">
            <Header type="title" title="이체하기" />

            <div className="space-y-[1.875rem] break-keep px-5 pt-[0.875rem]">
                <div className="text-caption-01 text-status-red font-medium">
                    *현재 결제 시스템 구축이 진행 중에 있어 부득이하게 계좌이체
                    방식으로 결제를 받고 있습니다. 이용에 불편을 드려 죄송하며,
                    더 나은 서비스 환경으로 빠르게 개선하겠습니다
                </div>

                <div>
                    <h2 className="text-headline-04">
                        1. 계좌 이체 시, 입금자명은 받으시는 분의 성함과{' '}
                        <span className="text-point">동일하게</span>{' '}
                        작성해주세요.
                    </h2>
                    <div className="text-body-03 text-gray-dark mt-1 font-normal">
                        배송지 정보에 있는 받으시는 분의 성함과 동일하게
                        작성되어 있지 않다면, 확인이 매우 늦어질 수 있습니다.
                    </div>
                    {renderCheckbox(0)}
                </div>

                <div>
                    <h2 className="text-headline-04">
                        2. 아래 계좌로{' '}
                        <span className="text-point">입급을 진행</span>
                        해주세요.
                    </h2>
                    <div className="text-body-02 mt-1 font-semibold">
                        결제 금액을 꼭 확인 후 진행해주세요.
                        <br />
                        계좌번호 : 국민은행 123456-01-234567
                    </div>
                    {renderCheckbox(1)}
                </div>

                <div>
                    <h2 className="text-headline-04">
                        3. 입금 후,{' '}
                        <span className="text-point">24시간 이내</span>로만 결제
                        취소 및 환불이 가능합니다.
                    </h2>
                    {renderCheckbox(2)}
                </div>
            </div>

            <div className="fixed bottom-0 w-full bg-white p-5 pb-8">
                <button
                    disabled={!isAllChecked}
                    onClick={() => router.push('/order/complete')}
                    className="text-body-02 disabled:bg-button-disabled flex h-14 w-full items-center justify-center rounded-[0.25rem] bg-black text-white"
                >
                    계속하기
                </button>
            </div>
        </div>
    );
}
