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
    deliveryRequest: undefined,
    agreedToTerms: false,
};

export const useBaseOrderRequestStore = create<BaseOrderRequest & Actions>()(
    persist(
        combine(intitalState, (set) => ({
            setBaseOrderRequest: (req) => set((prev) => ({ ...prev, ...req })),
            clearBaseOrderRequest: () => {
                sessionStorage.removeItem('LOOPZ-ORDER-REQUEST');
            },
        })),
        {
            name: 'LOOPZ-ORDER-REQUEST',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
