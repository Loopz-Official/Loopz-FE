'use client';

import { useRouter } from 'next/navigation';
import { overlay } from 'overlay-kit';

import ModalWrapper from '@/components/common/Modal/Wrapper';
import { ModalButtonType } from '@/types/modal';

type HandlerOptions = {
    orderNumber?: string;
    onSuccess?: () => void;
    type?: ModalButtonType;
};

export const useOrderStatusCTAHandlers = () => {
    const router = useRouter();

    const handlers = {
        cancel: ({ onSuccess, orderNumber }: HandlerOptions = {}) => {
            // 결제 취소
            overlay.open(({ isOpen, close }) => (
                <ModalWrapper
                    isOpen={isOpen}
                    onClose={close}
                    text="결제를 취소하시겠습니까?"
                    buttons={[
                        {
                            text: '확인',
                            onClick: () => {
                                router.push(
                                    `/my-order/cs-request/form?orderNumber=${orderNumber}`
                                );
                                // TODO: 주문 취소 API 연동
                                console.log('주문 취소');
                                onSuccess?.();
                                close();
                            },
                            type: 'primary',
                        },
                        {
                            text: '취소',
                            onClick: close,
                            type: 'secondary',
                        },
                    ]}
                />
            ));
        },
        track: () => {
            // 배송 조회
            /* ... */
        },
        confirm: () => {
            // 구매 확정
            /* ... */
        },
        return: ({ orderNumber }: HandlerOptions = {}) => {
            // 반품 접수
            router.push(`/my-order/cs-request/form?orderNumber=${orderNumber}`);
        },
    };

    return handlers;
};
