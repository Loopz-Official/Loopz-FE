'use client';

import SectionTitle from './SectionTitle';

export default function AddressSearchSection({
    address,
    setAddress,
    zonecode,
    setZonecode,
    addressDetail,
    setAddressDetail,
}: {
    address: string;
    setAddress: (address: string) => void;
    zonecode: string;
    setZonecode: (zonecode: string) => void;
    addressDetail: string;
    setAddressDetail: (addressDetail: string) => void;
}) {
    const execDaumPostcode = () => {
        new window.daum.Postcode({
            oncomplete: (data) => {
                setAddress(data.address);
                setZonecode(data.zonecode);
            },
        }).open();
    };

    return (
        <>
            <SectionTitle>주소</SectionTitle>

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
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
                placeholder="상세 주소를 입력해 주세요."
                className="border-gray-regular rounded-[0.25rem] border px-3 py-2.5 tracking-normal"
            />
        </>
    );
}
