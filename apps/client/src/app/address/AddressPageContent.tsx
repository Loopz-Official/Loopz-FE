'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import BottomButton from '@/components/common/BottomButton';
import BottomNotice from '@/components/common/BottomNotice';
import EditDeleteButton from '@/components/common/EditDeleteButton';
import Header from '@/components/layouts/Header';
import { useDeleteAddressMutation } from '@/hooks/mutations/useAddressMutation';
import { useAddressListQuery } from '@/hooks/queries/useAddressQuery';
import { useSelectedAddressStore } from '@/hooks/stores/useSelectedAddressStore';
import { PlusIcon } from '@/icons/Plus';

export default function AddressPageContent() {
    const router = useRouter();

    const [activeId, setActiveId] = useState<number | undefined>(undefined);
    const { selectedAddress, setSelectedAddress } = useSelectedAddressStore();

    const { data: addressList, isLoading, error } = useAddressListQuery();
    const deleteAddressMutation = useDeleteAddressMutation();
    // const updateAddressMutation = useUpdateAddressMutation();

    useEffect(() => {
        try {
            // 주소가 있을 때, 기본 배송지 선택 (or 첫 번째 배송지 선택)
            if (addressList && addressList.length > 0) {
                const defaultAddress = addressList.find(
                    (addr) => addr.defaultAddress
                );

                // 주문 완료 시 selectedAddress clear 필요! (기본 배송지 기준으로 기본 세팅되게끔)
                setActiveId(
                    selectedAddress
                        ? selectedAddress.addressId
                        : defaultAddress
                          ? defaultAddress.addressId
                          : addressList[0]?.addressId
                );
            }
        } catch {
            alert('배송지를 자동 선택하는 중 문제가 발생했습니다.');
        }
    }, [addressList, selectedAddress]);

    const handleAddButtonClick = () => {
        if (addressList?.length === 10) {
            alert('배송지는 최대 10개까지 등록하실 수 있습니다.');
            return;
        } else {
            router.push('/address/add');
        }
    };

    const handleSaveButtonClick = () => {
        const selectedAddress = addressList?.find(
            (address) => address.addressId === activeId
        );

        if (selectedAddress) {
            // const updatedAddress = {
            //     ...selectedAddress,
            //     defaultAddress: true,
            // };

            try {
                // await updateAddressMutation.mutateAsync({
                //     addressId: updatedAddress.addressId,
                //     updatedAddress,
                // });
                setSelectedAddress(selectedAddress);
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
            await deleteAddressMutation.mutateAsync(addressId);
        } catch {
            alert('배송지를 삭제하는 중 에러가 발생했습니다.');
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

                {error ? (
                    <div>Error: {error.message}</div>
                ) : isLoading ? (
                    <div>Loading...</div>
                ) : (
                    addressList?.map((address) => (
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
                                    <EditDeleteButton
                                        type="edit"
                                        onClick={() => {
                                            router.push(
                                                `/address/edit?addressId=${address.addressId}`
                                            );
                                        }}
                                    />
                                    <EditDeleteButton
                                        type="delete"
                                        onClick={() =>
                                            handleDeleteButtonClick(
                                                address.addressId
                                            )
                                        }
                                    />
                                </div>
                            </label>
                        </div>
                    ))
                )}
            </div>

            <BottomNotice type="address" />

            <BottomButton
                text="선택하기"
                isDisabled={false}
                onClick={handleSaveButtonClick}
            />
        </div>
    );
}
