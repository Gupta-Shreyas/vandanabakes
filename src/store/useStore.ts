import { create } from 'zustand';

export interface CartItem {
  id: string; // unique cart item id
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
  isEggless: boolean;
  message?: string;
  instructions?: string;
}

interface StoreState {
  cart: CartItem[];
  isCartOpen: boolean;
  isPincodeValid: boolean | null;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  validatePincode: (pincode: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  cart: [],
  isCartOpen: false,
  isPincodeValid: null,
  
  addToCart: (item) => set((state) => {
    // Basic check if same item exists (with same options)
    const existing = state.cart.find(c => 
      c.productId === item.productId &&
      c.size === item.size &&
      c.isEggless === item.isEggless &&
      c.message === item.message &&
      c.instructions === item.instructions
    );

    if (existing) {
      return {
        cart: state.cart.map(c => 
          c.id === existing.id 
            ? { ...c, quantity: c.quantity + item.quantity }
            : c
        )
      };
    }

    return {
      cart: [...state.cart, { ...item, id: crypto.randomUUID() }]
    };
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id)
  })),

  updateQuantity: (id, quantity) => set((state) => ({
    cart: state.cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    )
  })),

  toggleCart: () => set((state) => ({
    isCartOpen: !state.isCartOpen
  })),

  validatePincode: (pincode) => set(() => ({
    // Dummy validation logic: if it's 6 digits, it's valid
    isPincodeValid: /^\d{6}$/.test(pincode)
  }))
}));
