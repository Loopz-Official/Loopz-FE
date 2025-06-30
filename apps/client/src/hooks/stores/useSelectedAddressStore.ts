import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AddressInfo } from '@/schemas/address';

interface SelectedAddressStore {
    selectedAddress: AddressInfo | null;
    setSelectedAddress: (selectedAddress: AddressInfo) => void;
    clearSelectedAddress: () => void;
}

// TODO: 주문 결제 연결 후 selectedAddress default 값을 기본배송지로 수정
export const useSelectedAddressStore = create<SelectedAddressStore>()(
    persist(
        (set) => ({
            selectedAddress: null,
            setSelectedAddress: (selectedAddress) => set({ selectedAddress }),
            clearSelectedAddress: () => set({ selectedAddress: null }),
        }),
        {
            name: 'selected-address', // localStorage key
        }
    )
);
