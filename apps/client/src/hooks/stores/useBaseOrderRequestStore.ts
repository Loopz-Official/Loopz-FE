import { create } from 'zustand';
import { combine, createJSONStorage, persist } from 'zustand/middleware';

import { BaseOrderRequest } from '@/schemas/order';

type Actions = {
    setBaseOrderRequest: (req: Partial<BaseOrderRequest>) => void;
    clearBaseOrderRequest: () => void;
};

const intitalState: BaseOrderRequest = {
    addressId: undefined,
    paymentMethod: 'BANK_TRANSFER',
    deliveryRequest: undefined,
    agreedToTerms: false,
};

export const useBaseOrderRequestStore = create<BaseOrderRequest & Actions>()(
    persist(
        combine(intitalState, (set) => ({
            setBaseOrderRequest: (req) => set((prev) => ({ ...prev, ...req })),
            clearBaseOrderRequest: () => set(intitalState),
        })),
        {
            name: 'LOOPZ-ORDER-REQUEST',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
