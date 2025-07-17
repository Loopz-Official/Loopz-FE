import { create } from 'zustand';
import { combine, createJSONStorage, persist } from 'zustand/middleware';

import { BaseOrderRequest } from '@/schemas/order';

type Actions = {
    setBaseOrderRequest: (req: Partial<BaseOrderRequest>) => void;
    clearBaseOrderRequest: () => void;
};

const intitalState: BaseOrderRequest = {
    addressId: undefined,
    paymentMethod: undefined,
    deliveryRequest: '',
    agreedToTerms: false,
};

// 결제 시스템 도입 시 삭제 필요
export const useBaseOrderRequestStore = create<BaseOrderRequest & Actions>()(
    persist(
        combine(intitalState, (set) => ({
            setBaseOrderRequest: (req) => set((prev) => ({ ...prev, ...req })),
            clearBaseOrderRequest: () => {
                sessionStorage.removeItem('LOOPZ-ORDER-REQUEST');
            },
        })),
        {
            name: 'LOOPZ_ORDER_REQUEST',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
