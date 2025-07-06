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

// 주문 완료 시 자동으로 clearProducts 호출
export const useSelectedProductsStore = create<SelectedProducts>()(
    persist(
        combine(initialState, (set) => ({
            setProducts: (products) => set({ products }),
            clearProducts: () => {
                localStorage.removeItem('SELECTED_PRODUCTS');
            },
        })),

        {
            name: 'SELECTED_PRODUCTS',
        }
    )
);
