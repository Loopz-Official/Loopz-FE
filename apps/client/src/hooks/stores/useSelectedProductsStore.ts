import { create } from 'zustand';
import { combine, createJSONStorage, persist } from 'zustand/middleware';

import { SelectedProductInfo } from '@/schemas/order';
interface SelectedProducts {
    selectedProducts: SelectedProductInfo[];
    setSelectedProducts: (productInfos: SelectedProductInfo[]) => void;
    clearSelectedProducts: () => void;
}

const initialState: Pick<SelectedProducts, 'selectedProducts'> = {
    selectedProducts: [],
};

// 주문 완료 시 자동으로 clearProducts 호출
export const useSelectedProductsStore = create<SelectedProducts>()(
    persist(
        combine(initialState, (set) => ({
            setSelectedProducts: (products) =>
                set({ selectedProducts: products }),
            clearSelectedProducts: () => {
                localStorage.removeItem('SELECTED_PRODUCTS');
            },
        })),

        {
            name: 'LOOPZ_SELECTED_PRODUCTS',
            storage: createJSONStorage(() => localStorage, {
                replacer: (key, value) => {
                    if (key === 'selectedProducts') {
                        return btoa(JSON.stringify(value));
                    }
                    return value;
                },
                reviver: (key, value) => {
                    if (
                        key === 'selectedProducts' &&
                        typeof value === 'string'
                    ) {
                        return JSON.parse(atob(value));
                    }
                    return value;
                },
            }),
            partialize: (state) => ({
                selectedProducts: state.selectedProducts,
            }),
        }
    )
);
