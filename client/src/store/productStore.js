import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const createProductStore = (set) => ({
    cart: [],

    addCart: (product) => {
        set((state) => ({
            cart: [...state.cart,product]
        }))
    },
    removeCart: (productId) => {
        set((state) => ({
            cart: state.cart.filter(product => product._id !== productId)
        }))
    },
    adjustQuantity: (productId, qty) => {
        set((state) => ({
            cart: state.cart.map(product => product._id === productId ? { ...product, quantity: Number(qty) } : product)
        }))
    },
    resetCart: () => {
        set((state) => ({
            cart: []
        }))
    },
})
const useProductStore = create(
    devtools(
        persist(createProductStore, {
            name: "product"
        })
    )
)
export default useProductStore;