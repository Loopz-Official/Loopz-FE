'use client';

import { notFound, useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import BottomButton from '@/components/common/BottomButton';
import AddressSearchSection from '@/components/features/address/AddressSearchSection';
import NameSection from '@/components/features/address/NameSection';
import PhoneNumberSection from '@/components/features/address/PhoneNumberSection';
import Header from '@/components/layouts/Header';
import { useCreateAddressMutation } from '@/hooks/mutations/useAddressMutation';
import { AddressCURequest } from '@/schemas/address';

export default function AddressTypePageContent() {
    const router = useRouter();
    const { type } = useParams();

    if (type !== 'add' && type !== 'edit') notFound();

    const [newAddress, setNewAddress] = useState<AddressCURequest>({
        recipientName: '',
        phoneNumber: '',
        zoneCode: '',
        address: '',
        addressDetail: '',
        defaultAddress: false,
    });

    const isValidPhoneNumber = newAddress.phoneNumber
        .split('-')
        .every((number) => number);
    const isDisabled = !(
        newAddress.recipientName &&
        isValidPhoneNumber &&
        newAddress.address &&
        newAddress.zoneCode
    );

    const { mutateAsync: createAddressMutation } = useCreateAddressMutation();

    const handleSaveButtonClick = async () => {
        try {
            await createAddressMutation(newAddress);
            router.push('/address');
        } catch {
            alert('주소 등록에 실패했습니다.');
        }
    };

    const handleFieldChange = (
        field: keyof AddressCURequest,
        value: string | boolean
    ) => {
        setNewAddress((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <div className="pb-17">
            <Header type="title" title="배송지 수정" />

            <div className="space-y-6 px-5 py-3">
                {/* 받으시는 분 (이름) */}
                <div className="text-body-03 font-regular flex flex-col gap-2">
                    <NameSection
                        value={newAddress.recipientName}
                        onChange={(value) =>
                            handleFieldChange('recipientName', value)
                        }
                    />
                </div>

                {/* 연락처 */}
                <div className="text-body-03 font-regular flex flex-col gap-2">
                    <PhoneNumberSection
                        value={newAddress.phoneNumber}
                        onChange={(value) =>
                            handleFieldChange('phoneNumber', value)
                        }
                    />
                </div>

                {/* 주소 */}
                <div className="text-body-03 font-regular flex flex-col gap-2">
                    <AddressSearchSection
                        address={newAddress.address}
                        zoneCode={newAddress.zoneCode}
                        addressDetail={newAddress.addressDetail}
                        onFieldChange={handleFieldChange}
                    />
                </div>

                <label className="flex w-fit cursor-pointer items-center gap-2">
                    <input
                        onChange={(e) =>
                            handleFieldChange(
                                'defaultAddress',
                                e.target.checked
                            )
                        }
                        checked={newAddress.defaultAddress}
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
