import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// 이메일만을 위한 전역 상태 타입
interface UserEmailStore {
    email: string;
    setUserEmail: (email: string) => void;
    clearUserEmail: () => void;
}

export const useUserEmailStore = create<UserEmailStore>()(
    persist(
        (set) => ({
            email: '',
            setUserEmail: (email) => set({ email }),
            clearUserEmail: () => localStorage.removeItem('LOOPZ_USER_EMAIL'),
        }),
        {
            name: 'LOOPZ_USER_EMAIL',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
