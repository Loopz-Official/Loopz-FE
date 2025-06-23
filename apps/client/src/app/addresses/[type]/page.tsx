'use client';

import { notFound, useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import BottomButton from '@/components/common/BottomButton';
import AddressSearchSection from '@/components/features/addresses/AddressSearchSection';
import NameSection from '@/components/features/addresses/NameSection';
import PhoneNumberSection from '@/components/features/addresses/PhoneNumberSection';
import Header from '@/components/layouts/Header';

export default function Page() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [zonecode, setZonecode] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [isDefaultAddress, setIsDefaultAddress] = useState(false);

    const isValidPhoneNumber = phoneNumber.split('-').every((number) => number);
    const isDisabled = !(name && isValidPhoneNumber && address && zonecode);

    const router = useRouter();
    const params = useParams();
    const type = params.type;

    if (type !== 'add' && type !== 'edit') notFound();

    const handleSaveButtonClick = () => {
        const body = {
            recipientName: name,
            phoneNumber,
            zonecode,
            address,
            addressDetail,
            defaultAddress: isDefaultAddress,
        };
        console.log(body);
        router.push('/addresses');
    };

    return (
        <div className="pb-17">
            <Header type="title" title="배송지 수정" />

            <div className="space-y-6 px-5 py-3">
                {/* 받으시는 분 (이름) */}
                <div className="text-body-03 font-regular flex flex-col gap-2">
                    <NameSection name={name} setName={setName} />
                </div>

                {/* 연락처 */}
                <div className="text-body-03 font-regular flex flex-col gap-2">
                    <PhoneNumberSection
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                    />
                </div>

                {/* 주소 */}
                <div className="text-body-03 font-regular flex flex-col gap-2">
                    <AddressSearchSection
                        address={address}
                        setAddress={setAddress}
                        zonecode={zonecode}
                        setZonecode={setZonecode}
                        addressDetail={addressDetail}
                        setAddressDetail={setAddressDetail}
                    />
                </div>

                <label className="flex w-fit cursor-pointer items-center gap-2">
                    <input
                        onChange={() => setIsDefaultAddress(!isDefaultAddress)}
                        checked={isDefaultAddress}
                        type="checkbox"
                        className="border-gray-09 rounded-xs not-checked:bg-[url('/unchecked-check.svg')] relative h-4 w-4 cursor-pointer appearance-none border bg-center bg-no-repeat checked:border-black checked:bg-black checked:bg-[url('/checked-check.svg')]"
                    />
                    <span className="text-body-03">기본 배송지로 설정</span>
                </label>
            </div>

            <BottomButton
                text="저장하기"
                isDisabled={isDisabled}
                onClick={handleSaveButtonClick}
            />
        </div>
    );
}
