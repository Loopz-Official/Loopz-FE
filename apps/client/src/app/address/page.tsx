'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import BottomButton from '@/components/common/BottomButton';
import Header from '@/components/layouts/Header';
import { PlusIcon } from '@/icons/Plus';
import { deleteAddress, getAddressList } from '@/services/apis/address';
import { Address } from '@/services/apis/address/types';
import { useSelectedAddressStore } from '@/store/useSelectedAddressStore';

export default function Page() {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();

    const { setSelectedAddress } = useSelectedAddressStore();

    useEffect(() => {
        const callGetAddressList = async () => {
            try {
                const response = await getAddressList();
                setAddresses(response.data.addresses);
            } catch (error) {
                alert('배송지를 불러오는 중 문제가 발생했습니다.');
                console.error('getAddressList 실패: ', error);
            }
        };

        callGetAddressList();
    }, []);

    const handleAddButtonClick = () => {
        if (addresses.length === 10) {
            alert('배송지는 최대 10개까지 등록하실 수 있습니다.');
        } else {
            router.push('/address/add');
        }
    };

    const handleSaveButtonClick = () => {
        if (addresses[activeIndex]) {
            setSelectedAddress(addresses[activeIndex]);
            router.push('/order/form');
        }
    };

    const handleDeleteButtonClick = async (addressId: number) => {
        try {
            await deleteAddress(addressId);
            setAddresses(
                addresses.filter((address) => address.addressId !== addressId)
            );
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

                {addresses.map((address, i) => (
                    <div
                        key={address.addressId}
                        className="grid grid-cols-[auto_1fr] gap-2"
                    >
                        <input
                            onChange={() => setActiveIndex(i)}
                            checked={activeIndex === i}
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

            <div className="bottom-18 fixed w-full">
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
