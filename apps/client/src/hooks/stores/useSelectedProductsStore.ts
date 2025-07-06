import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { ObjectInfo } from '@/schemas/object';

export interface Product
    extends Pick<
        ObjectInfo,
        'objectId' | 'objectName' | 'objectPrice' | 'imageUrl'
    > {
    quantity: number;
}

interface SelectedProducts {
    products: Product[];
    setProducts: (products: Product[]) => void;
    addProduct: (product: Product) => void;
    removeProduct: (objectId: string) => void;
    clearProducts: () => void;
}

export const useSelectedProductsStore = create<SelectedProducts>()(
    persist(
        (set) => ({
            products: [],
            setProducts: (products) => set({ products }),
            addProduct: (product) =>
                set((state) => ({ products: [...state.products, product] })),
            removeProduct: (objectId) =>
                set((state) => ({
                    products: state.products.filter(
                        (p) => p.objectId !== objectId
                    ),
                })),
            clearProducts: () => set({ products: [] }),
        }),
        {
            name: 'selected-products-storage',
        }
    )
);
