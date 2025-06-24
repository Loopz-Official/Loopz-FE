import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Address } from '@/services/apis/address/types';

interface SelectedAddressStore {
    selectedAddress: Address | null;
    setSelectedAddress: (selectedAddress: Address) => void;
    clearSelectedAddress: () => void;
}

// TODO: 주문 결제 연결 후 selectedAddress default 값을 기본배송지로 수정
export const useSelectedAddressStore = create(
    persist<SelectedAddressStore>(
        (set) => ({
            selectedAddress: null,
            setSelectedAddress: (selectedAddress) => set({ selectedAddress }),
            clearSelectedAddress: () => set({ selectedAddress: null }),
        }),
        {
            name: 'selectedAddress', // localStorage key
        }
    )
);
