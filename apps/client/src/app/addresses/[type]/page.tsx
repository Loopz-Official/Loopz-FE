'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

import BottomButton from '@/components/features/order/BottomButton';

export default function Page() {
    const [address, setAddress] = useState('');
    const [zonecode, setZonecode] = useState('');

    const params = useParams();
    const type = params.type;

    if (type !== 'add' && type !== 'edit') return;

    const execDaumPostcode = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                setAddress(data.address);
                setZonecode(data.zonecode);
            },
        }).open();
    };

    return (
        <div>
            {/* 헤더 */}

            <div className="h-[calc(100vh-112px)] px-5 py-3">
                {/* 이름 */}
                <div></div>

                {/* 연락처 */}
                <div></div>

                {/* 주소 */}
                <div className="text-body-03 font-regular flex flex-col gap-2">
                    <div className="space-x-0.5">
                        주소 <span className="text-point text-body-02">*</span>
                    </div>

                    <div className="flex gap-1.5">
                        <input
                            readOnly
                            value={zonecode}
                            className="border-gray-regular grow rounded-[0.25rem] border px-3 py-2.5 tracking-normal"
                        />
                        <button
                            onClick={execDaumPostcode}
                            className="rounded-[0.25rem] border border-black px-4 py-2.5"
                        >
                            우편번호 검색
                        </button>
                    </div>

                    <input
                        readOnly
                        value={address}
                        className="border-gray-regular rounded-[0.25rem] border px-3 py-2.5 tracking-normal"
                    />

                    <input
                        placeholder="상세 주소를 입력해 주세요."
                        className="border-gray-regular rounded-[0.25rem] border px-3 py-2.5 tracking-normal"
                    />
                </div>
            </div>

            <BottomButton text="저장하기" onClick={() => {}} isDisabled />
        </div>
    );
}
