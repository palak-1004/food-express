import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PastOrder = {
    id: string;
    date: string;
    total: number;
    items: string; 
    restaurantName: string;
};

export type Address = {
    id: string;
    tag: string; 
    title: string;
    text: string;
}

type UserStore = {
    addresses: Address[];
    orders: PastOrder[];
    addAddress: (address: Address) => void;
    addOrder: (order: PastOrder) => void;
};

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            addresses: [
                {
                    id: '1',
                    tag: 'HOME',
                    title: 'Primary Address',
                    text: '123 Main Street, Block A, 4th Floor\nMumbai, Maharashtra 400001'
                }
            ],
            orders: [],
            addAddress: (address) => set((state) => ({ addresses: [...state.addresses, address] })),
            addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] }))
        }),
        {
            name: 'user-storage',
        }
    )
);
