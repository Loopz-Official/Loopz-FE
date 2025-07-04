import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

import { SelectedProduct } from '@/schemas/order';

interface SelectedProducts {
    products: SelectedProduct[];
    setProducts: (products: SelectedProduct[]) => void;
    clearProducts: () => void;
}

const initialState = {
    products: [] as SelectedProduct[],
};

export const useSelectedProductsStore = create<SelectedProducts>()(
    persist(
        combine(initialState, (set) => ({
            setProducts: (products) => set({ products }),
            clearProducts: () => set(initialState),
        })),

        {
            name: 'SELECTED_PRODUCTS',
        }
    )
);
