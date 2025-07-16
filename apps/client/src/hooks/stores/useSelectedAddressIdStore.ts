import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SelectedAddressIdStore {
    selectedAddressId: string | null;
    setSelectedAddressId: (addressId: string) => void;
    clearSelectedAddressId: () => void;
}

// 주문 완료 시 자동으로 clearSelectedAddressId 호출
export const useSelectedAddressIdStore = create<SelectedAddressIdStore>()(
    persist(
        (set) => ({
            selectedAddressId: null,
            setSelectedAddressId: (addressId) =>
                set({ selectedAddressId: addressId }),
            clearSelectedAddressId: () => {
                localStorage.removeItem('LOOPZ_USER_SELECTED_ADDRESS_ID');
            },
        }),
        {
            name: 'LOOPZ_SELECTED_ADDRESS',
            storage: createJSONStorage(() => localStorage, {
                replacer: (key, value) => {
                    if (key === 'selectedAddressId') {
                        return btoa(JSON.stringify(value));
                    }
                    return value;
                },
                reviver: (key, value) => {
                    if (
                        key === 'selectedAddressId' &&
                        typeof value === 'string'
                    ) {
                        return JSON.parse(atob(value));
                    }
                    return value;
                },
            }),
            partialize: (state) => ({
                selectedAddressId: state.selectedAddressId,
            }),
        }
    )
);
