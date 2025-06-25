import { create } from 'zustand';
import { combine, createJSONStorage, persist } from 'zustand/middleware';

import { UserInfo } from '@/schemas/auth';

type UserInfoStore = UserInfo & {
    setUserInfo: (info: Partial<UserInfo>) => void;
};

const initialState: UserInfo = {
    userId: '',
    email: '',
    loginName: null,
    realName: null,
    nickName: null,
    enabled: false,
    over14: null,
    agreedServiceTerms: null,
    agreedMarketing: null,
    agreedEventSMS: null,
};

export const useUserInfo = create<UserInfoStore>()(
    persist(
        combine(initialState, (set) => ({
            setUserInfo: (info: Partial<UserInfo>) => set(info),
        })),
        {
            name: 'user-info',
            storage: createJSONStorage(() => sessionStorage), // Session Storage 연동
        }
    )
);
