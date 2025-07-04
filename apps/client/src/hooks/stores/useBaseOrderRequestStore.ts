import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BaseOrderRequest {
    addressId: string;
    paymentMethod: string;
    deliveryRequest: string;
    agreedToTerms: boolean;
    setBaseOrderRequest: (req: Partial<BaseOrderRequest>) => void;
    clearBaseOrderRequest: () => void;
}

export const useBaseOrderRequestStore = create<BaseOrderRequest>()(
    persist(
        (set) => ({
            addressId: '',
            paymentMethod: '',
            deliveryRequest: '',
            agreedToTerms: false,
            setBaseOrderRequest: (req) => set((prev) => ({ ...prev, ...req })),
            clearBaseOrderRequest: () =>
                set({
                    addressId: '',
                    paymentMethod: '',
                    deliveryRequest: '',
                    agreedToTerms: false,
                }),
        }),
        {
            name: 'base-order-request-storage',
        }
    )
);
