import { create } from 'zustand';
import { combine } from 'zustand/middleware';

import { LEAVE_REASONS } from '@/constants/user';

export interface LeaveReasonStore {
    reason: string;
    setReason: (reason: string) => void;
}

const initialState = {
    reason: LEAVE_REASONS[0]!,
};

export const useLeaveReasonStore = create<LeaveReasonStore>()(
    combine(initialState, (set) => ({
        setReason: (reason: string) => set(() => ({ reason })),
    }))
);
