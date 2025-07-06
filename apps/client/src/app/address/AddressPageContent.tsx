'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import BottomButton from '@/components/common/BottomButton';
import BottomNotice from '@/components/common/BottomNotice';
import EditDeleteButton from '@/components/common/EditDeleteButton';
import Header from '@/components/layouts/Header';
import { OrderFrom } from '@/constants/order';
import { useDeleteAddressMutation } from '@/hooks/mutations/useAddressMutation';
import { useAddressListQuery } from '@/hooks/queries/useAddressQuery';
import { useSelectedAddressIdStore } from '@/hooks/stores/useSelectedAddressIdStore';
import { PlusIcon } from '@/icons/Plus';
import { getOrderFromQueryString } from '@/utils/route';

export default function AddressPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderFrom = searchParams.get('orderFrom') as OrderFrom;
    const orderFromQueryString = getOrderFromQueryString(orderFrom);

    const [activeId, setActiveId] = useState<string | undefined>(undefined);
    const { selectedAddressId, setSelectedAddressId } =
        useSelectedAddressIdStore();

    const { data: addressList, isLoading, error } = useAddressListQuery();
    const deleteAddressMutation = useDeleteAddressMutation();
    // const updateAddressMutation = useUpdateAddressMutation();

    useEffect(() => {
        if (!addressList || addressList.length === 0) return;

        const info =
            (selectedAddressId &&
                addressList.find(
                    (addr) => addr.addressId === selectedAddressId
                )) ||
            addressList.find((addr) => addr.defaultAddress) ||
            addressList[0];

        if (info) {
            setActiveId(info.addressId);
        }
    }, [addressList, selectedAddressId]);

    const handleAddButtonClick = () => {
        if (addressList?.length === 10) {
            toast('배송지는 최대 10개까지 등록할 수 있습니다');
            return;
        } else {
            router.push(`/address/add?${orderFromQueryString}`);
        }
    };

    const handleSaveButtonClick = () => {
        if (activeId) {
            try {
                setSelectedAddressId(activeId);
                router.push(`/order/form?${orderFromQueryString}`);
            } catch {
                toast.error('배송지 업데이트 중 에러가 발생했습니다.');
            }
        } else {
            toast('배송지를 선택해주세요');
        }
    };

    const handleDeleteButtonClick = async (addressId: string) => {
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
                                        {address.addressDetail
                                            ? `, ${address.addressDetail}`
                                            : ''}
                                    </div>
                                    <div>{address.phoneNumber}</div>
                                </div>

                                <div className="flex gap-1">
                                    <EditDeleteButton
                                        type="edit"
                                        onClick={() => {
                                            router.push(
                                                `/address/edit?addressId=${address.addressId}&${orderFromQueryString}`
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
