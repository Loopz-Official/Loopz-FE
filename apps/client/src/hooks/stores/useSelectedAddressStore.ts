import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AddressInfo } from '@/schemas/address';

interface SelectedAddressStore {
    selectedAddress: AddressInfo | null;
    setSelectedAddress: (selectedAddress: AddressInfo) => void;
    clearSelectedAddress: () => void;
}

// 📌 주문 완료 시에 clearSelectedAddress 실행 필요 (상태 값 초기화)
export const useSelectedAddressStore = create<SelectedAddressStore>()(
    persist(
        (set) => ({
            selectedAddress: null,
            setSelectedAddress: (selectedAddress) => set({ selectedAddress }),
            clearSelectedAddress: () => set({ selectedAddress: null }),
        }),
        {
            name: 'LOOPZ-USER-SELECTED-ADDRESS',
        }
    )
);
