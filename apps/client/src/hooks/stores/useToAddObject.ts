import { create } from 'zustand';
import { combine } from 'zustand/middleware';

type PurchaseInfo = {
    objectId: string;
    quantity: number;
};

type ToAddObjectStore = PurchaseInfo & {
    setPurchaseInfo: (info: PurchaseInfo) => void;
};

const initialState: PurchaseInfo = {
    objectId: '',
    quantity: 0,
};

export const useToAddObjectStore = create<ToAddObjectStore>()(
    combine(initialState, (set) => ({
        setPurchaseInfo: (info: PurchaseInfo) => set(info),
    }))
);
