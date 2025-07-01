'use client';

import SectionTitle from './SectionTitle';

interface AddressSearchSectionProps {
    address: string;
    zoneCode: string;
    addressDetail: string;
    onFieldChange: (
        field: 'address' | 'zoneCode' | 'addressDetail',
        value: string
    ) => void;
}

export default function AddressSearchSection({
    address,
    zoneCode,
    addressDetail,
    onFieldChange,
}: AddressSearchSectionProps) {
    const execDaumPostcode = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                onFieldChange('address', data.address);
                onFieldChange('zoneCode', data.zonecode);
            },
        }).open();
    };

    return (
        <>
            <SectionTitle>주소</SectionTitle>

            <div className="flex gap-1.5">
                <input
                    readOnly
                    value={zoneCode}
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
                value={addressDetail}
                onChange={(e) => onFieldChange('addressDetail', e.target.value)}
                placeholder="상세 주소를 입력해 주세요."
                className="border-gray-regular rounded-[0.25rem] border px-3 py-2.5 tracking-normal"
            />
        </>
    );
}
