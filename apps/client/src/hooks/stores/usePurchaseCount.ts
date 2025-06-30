import { create } from 'zustand';
import { combine } from 'zustand/middleware';

type PurchaseCountStore = {
    count: number;
    increaseCount: (stock: number) => void;
    decreaseCount: () => void;
};

const initialState = {
    count: 1,
};

export const usePurchaseCountStore = create<PurchaseCountStore>()(
    combine(initialState, (set) => ({
        increaseCount: (stock: number) =>
            set((state) => ({
                count: state.count < stock ? state.count + 1 : stock,
            })),
        decreaseCount: () =>
            set((state) => ({
                count: state.count > 1 ? state.count - 1 : 1,
            })),
    }))
);
