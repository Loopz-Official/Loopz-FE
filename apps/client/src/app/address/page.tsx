'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import BottomButton from '@/components/common/BottomButton';
import Header from '@/components/layouts/Header';
import { useSelectedAddressStore } from '@/hooks/stores/useSelectedAddressStore';
import { PlusIcon } from '@/icons/Plus';
import { AddressList } from '@/schemas/address';
import {
    deleteAddress,
    getAddressList,
    updateAddress,
} from '@/services/api/address';

export default function AddressPage() {
    const router = useRouter();

    const [addresses, setAddresses] = useState<AddressList>([]);
    const [activeId, setActiveId] = useState<number | undefined>(undefined);

    const { setSelectedAddress } = useSelectedAddressStore();

    // Also triggered when delete API call successed
    const fetchAddressList = async () => {
        try {
            const addressList = await getAddressList();
            setAddresses(addressList ?? []);

            // 주소가 있을 때, 기본 배송지 선택 (or 첫 번째 배송지 선택)
            if (addressList && addressList.length > 0) {
                const defaultAddress = addressList.find(
                    (addr) => addr.defaultAddress
                );
                setActiveId(
                    defaultAddress
                        ? defaultAddress.addressId
                        : addressList[0]?.addressId
                );
            }
        } catch {
            alert('배송지 목록을 불러오는 중 문제가 발생했습니다.');
        }
    };

    useEffect(() => {
        fetchAddressList();
    }, []);

    const handleAddButtonClick = () => {
        if (addresses.length === 10) {
            alert('배송지는 최대 10개까지 등록하실 수 있습니다.');
            return;
        } else {
            router.push('/address/add');
        }
    };

    const handleSaveButtonClick = async () => {
        const selectedAddress = addresses.find(
            (address) => address.addressId === activeId
        );

        if (selectedAddress) {
            const updatedAddress = {
                ...selectedAddress,
                defaultAddress: true,
            };

            try {
                await updateAddress(updatedAddress.addressId, updatedAddress);
                setSelectedAddress(updatedAddress);
                router.push('/order/form');
            } catch {
                alert('배송지 업데이트 중 에러가 발생했습니다.');
            }
        } else {
            alert('선택된 배송지가 없습니다.');
        }
    };

    const handleDeleteButtonClick = async (addressId: number) => {
        try {
            // 추후 Mutation or Refresh 사용 예정
            await deleteAddress(addressId);
            await fetchAddressList();
        } catch (error) {
            alert('배송지를 삭제하는 중 에러가 발생했습니다.');
            console.error('deleteAddress 실패: ', error);
        }
    };

    return (
        <div className="pb-17">
            <Header type="title" title="배송지 정보" />

            <div className="flex flex-col gap-6 px-5 py-2">
                <button
                    onClick={handleAddButtonClick}
                    className="border-gray-regular flex w-full items-center justify-center gap-1 rounded-[0.25rem] border py-3"
                >
                    <PlusIcon className="h-4 w-4" />
                    배송지 추가
                </button>

                {addresses.map((address) => (
                    <div
                        key={address.addressId}
                        className="grid grid-cols-[auto_1fr] gap-2"
                    >
                        <input
                            onChange={() => setActiveId(address.addressId)}
                            checked={activeId === address.addressId}
                            id={String(address.addressId)}
                            type="radio"
                            name="address"
                            className="border-gray-10 before:-translate-1/2 relative m-1 h-4 w-4 appearance-none rounded-full border before:absolute before:left-1/2 before:top-1/2 before:hidden before:h-2.5 before:w-2.5 before:rounded-full before:bg-black checked:border-black checked:before:block"
                        />
                        <label
                            htmlFor={String(address.addressId)}
                            className="flex flex-col"
                        >
                            <div className="flex items-center gap-1 font-semibold">
                                <span className="text-body-02">
                                    {address.recipientName}
                                </span>
                                {address.defaultAddress && (
                                    <span className="text-point text-caption-01">
                                        기본 배송지
                                    </span>
                                )}
                            </div>

                            <div className="text-body-03 text-gray-dark mb-1.5 mt-1 flex flex-col gap-0.5 font-normal">
                                <div>
                                    [{address.zoneCode}] {address.address}
                                    ,&nbsp;
                                    {address.addressDetail}
                                </div>
                                <div>{address.phoneNumber}</div>
                            </div>

                            <div className="flex gap-1">
                                {/* <button className="border-gray-regular rounded-xs text-caption-01 border px-4 py-1">
                                    수정
                                </button> */}
                                <button
                                    onClick={() =>
                                        handleDeleteButtonClick(
                                            address.addressId
                                        )
                                    }
                                    className="border-gray-regular rounded-xs text-caption-01 border px-4 py-1"
                                >
                                    삭제
                                </button>
                            </div>
                        </label>
                    </div>
                ))}
            </div>

            <div className="bottom-18 fixed w-full max-w-2xl">
                <hr className="border-gray-light mt-6 border-4" />

                <div className="text-disabled text-caption-02 mb-3 mt-5 grid grid-cols-[auto_1fr] gap-0.5 px-5">
                    <div className="w-4 text-center font-black">·</div>
                    <div>배송지는 최대 10개까지 등록하실 수 있습니다.</div>
                </div>
            </div>

            <BottomButton
                text="저장하기"
                isDisabled={false}
                onClick={handleSaveButtonClick}
            />
        </div>
    );
}
