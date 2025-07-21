'use client';

import { overlay } from 'overlay-kit';

import Modal from '@/components/common/Modal/Wrapper';
import { ModalButtonType } from '@/types/modal';

type HandlerOptions = {
    orderNumber?: string;
    onSuccess?: () => void;
    type?: ModalButtonType;
};

export const MY_PAGE_ORDER_CTA_HANDLERS = {
    cancel: ({ onSuccess }: HandlerOptions = {}) => {
        // 결제 취소
        overlay.open(({ isOpen, close }) => (
            <Modal
                isOpen={isOpen}
                onClose={close}
                text="결제를 취소하시겠습니까?"
                buttons={[
                    {
                        text: '확인',
                        onClick: () => {
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
    return: () => {
        // 반품 신청
        /* ... */
    },
};
