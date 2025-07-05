import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SelectedAddressIdStore {
    selectedAddressId: string | null;
    setSelectedAddressId: (addressId: string) => void;
    clearSelectedAddressId: () => void;
}

// 📌 주문 완료 시에 clearSelectedAddress 실행 필요 (상태 값 초기화)
export const useSelectedAddressIdStore = create<SelectedAddressIdStore>()(
    persist(
        (set) => ({
            selectedAddressId: null,
            setSelectedAddressId: (addressId) =>
                set({ selectedAddressId: addressId }),
            clearSelectedAddressId: () => set({ selectedAddressId: null }),
        }),
        {
            name: 'LOOPZ_USER_SELECTED_ADDRESS_ID',
        }
    )
);
