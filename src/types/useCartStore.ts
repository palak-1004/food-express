import { create } from 'zustand';

export type CartItem = {
    id: string; // Unique identifier for the food item (e.g., res.id + food.name)
    restaurantId: string;
    restaurantName: string;
    name: string;
    price: number;
    quantity: number;
};

type CartStore = {
    items: CartItem[];
    showPopup: boolean;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
    closePopup: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    showPopup: false,
    closePopup: () => set({ showPopup: false }),
    addItem: (newItem) => set((state) => {
        let newItems;
        const existingItem = state.items.find(item => item.id === newItem.id);
        if (existingItem) {
            newItems = state.items.map(item =>
                item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            newItems = [...state.items, { ...newItem, quantity: 1 }];
        }
        
        return { items: newItems, showPopup: true };
    }),
    removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
    })),
    updateQuantity: (id, quantity) => set((state) => {
        if (quantity <= 0) {
            return { items: state.items.filter(item => item.id !== id) };
        }
        return {
            items: state.items.map(item =>
                item.id === id ? { ...item, quantity } : item
            ),
            showPopup: true
        };
    }),
    clearCart: () => set({ items: [], showPopup: false }),
    getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
    getTotalPrice: () => get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
}));
