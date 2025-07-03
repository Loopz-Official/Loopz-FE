'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ChevronDownIcon } from '@/components/icons/ChevronDown';
import { DELIVERY_REQUESTS } from '@/constants/delivery';
import { useAddressListQuery } from '@/hooks/queries/useAddressQuery';
import { useSelectedAddressStore } from '@/hooks/stores/useSelectedAddressStore';
import { PlusIcon } from '@/icons/Plus';
import { AddressInfo } from '@/schemas/address';

type AddressSectionProps = {
    onActiveAddressInfoChange: (info: AddressInfo | undefined) => void;
    deliveryRequest: string | null;
    setDeliveryRequest: (request: string | null) => void;
    textareaContent: string;
    setTextareaContent: (content: string) => void;
};

export default function AddressSection({
    onActiveAddressInfoChange,
    deliveryRequest,
    setDeliveryRequest,
    textareaContent,
    setTextareaContent,
}: AddressSectionProps) {
    const router = useRouter();

    const { selectedAddress } = useSelectedAddressStore();
    const { data: addressList, isLoading, error } = useAddressListQuery();
    const [activeAddressInfo, setActiveAddressInfo] = useState<AddressInfo>();

    // 주소가 있을 때, 기본 배송지 선택 (or 첫 번째 배송지 선택)
    useEffect(() => {
        if (addressList && addressList.length > 0) {
            const defaultAddress = addressList.find(
                (addr) => addr.defaultAddress
            );
            const info = selectedAddress
                ? selectedAddress
                : defaultAddress
                  ? defaultAddress
                  : addressList[0];
            setActiveAddressInfo(info);
            onActiveAddressInfoChange(info);
        } else {
            setActiveAddressInfo(undefined);
            onActiveAddressInfoChange(undefined);
        }
    }, [addressList, onActiveAddressInfoChange, selectedAddress]);

    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const isTextareaOpen =
        deliveryRequest === DELIVERY_REQUESTS.at(-1) && !isOptionsOpen;

    // 직접 입력 textarea 내용 임시 저장
    useEffect(() => {
        sessionStorage.setItem('textareaContent', String(textareaContent));
    }, [textareaContent]);

    // 저장된 textarea 내용 불러오기
    useEffect(() => {
        const savedTextareaContent = sessionStorage.getItem('textareaContent');

        if (!savedTextareaContent) return;
        setTextareaContent(savedTextareaContent);
    }, [isTextareaOpen, setTextareaContent]);

    return (
        <>
            <header className="h-7.5 flex items-center justify-between">
                <h2 className="text-body-01 font-semibold">배송지 정보</h2>
                {activeAddressInfo && (
                    <button
                        onClick={() => router.push('/address')}
                        className="text-caption-01 rounded-xs border-gray-regular flex w-[3.375rem] items-center justify-center border py-1"
                    >
                        변경
                    </button>
                )}
            </header>

            {error ? (
                <div className="flex h-32 items-center justify-center">
                    <span className="text-red-500">
                        주소 정보를 불러오지 못했습니다.
                    </span>
                </div>
            ) : isLoading ? (
                <div className="flex h-32 items-center justify-center">
                    <span>주소 정보를 불러오는 중입니다...</span>
                </div>
            ) : activeAddressInfo ? (
                <>
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-1">
                            <span className="text-body-03 font-semibold">
                                {activeAddressInfo.recipientName}
                            </span>
                            {activeAddressInfo.defaultAddress && (
                                <span className="text-caption-01 text-point font-semibold">
                                    기본 배송지
                                </span>
                            )}
                        </div>
                        <div className="text-caption-01 tracking-normal">
                            [{activeAddressInfo.zoneCode}]{' '}
                            {activeAddressInfo.address}
                            ,&nbsp;{activeAddressInfo.addressDetail}
                        </div>
                        <div className="text-caption-01 tracking-normal">
                            {activeAddressInfo.phoneNumber}
                        </div>
                    </div>

                    {/* 배송 요청사항  */}
                    <div>
                        <button
                            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                            className={`${isOptionsOpen || isTextareaOpen ? 'rounded-t-xs' : 'rounded-xs'} border-gray-regular text-caption-01 w-full border transition-[max-height]`}
                        >
                            <div
                                className={`${deliveryRequest ? 'text-black' : 'text-disabled'} flex items-center justify-between px-3 py-2.5`}
                            >
                                {deliveryRequest || '배송 요청사항 선택'}
                                <ChevronDownIcon
                                    className={clsx(
                                        'h-4 w-4 transition-all',
                                        isOptionsOpen
                                            ? 'rotate-180 text-black'
                                            : 'text-gray-10'
                                    )}
                                />
                            </div>
                        </button>
                        {isOptionsOpen && (
                            <div className="border-gray-regular text-gray-dark rounded-b-xs text-caption-01 flex flex-col border border-t-0">
                                {DELIVERY_REQUESTS.map((request) => (
                                    <button
                                        key={request}
                                        onClick={() => {
                                            setDeliveryRequest(request);
                                            setIsOptionsOpen(false);
                                        }}
                                        className="active:bg-gray-regular w-full px-4 py-2.5 text-left transition-colors"
                                    >
                                        {request}
                                    </button>
                                ))}
                            </div>
                        )}
                        {isTextareaOpen && (
                            <textarea
                                value={textareaContent}
                                onChange={(e) =>
                                    setTextareaContent(e.target.value)
                                }
                                maxLength={50}
                                placeholder="내용을 입력해 주세요. (최대 50자)"
                                className="h-26 placeholder:text-disabled text-caption-01 border-gray-regular rounded-b-xs flex w-full resize-none flex-col border border-t-0 p-4 outline-none"
                            />
                        )}
                    </div>
                </>
            ) : (
                <div className="text-body-03 text-center font-normal">
                    <div className="text-disabled mb-8 mt-5">
                        등록된 배송지가 없습니다.
                        <br />
                        배송지를 신규입력 해주세요.
                    </div>
                    <button
                        onClick={() => router.push('/address/add')}
                        className="border-gray-regular flex w-full items-center justify-center gap-1 rounded-sm border py-3"
                    >
                        <PlusIcon className="h-4 w-4" />
                        배송지 추가
                    </button>
                </div>
            )}
        </>
    );
}
