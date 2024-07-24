"use client"
import { useStore } from "@/src/store"
import { Product } from "@prisma/client"

type AddProductButtonProps = {
    product: Product
}

export default function AddProductButton({ product }: AddProductButtonProps) {

    const addToCart = useStore((state) => state.addToOrder)

    return (
        <button 
            type="button"
            className="border-4 border-indigo-600 rounded-lg p-3 mt-5 uppercase text-indigo-950 font-black w-full hover:bg-indigo-600 hover:text-white transition-all"
            onClick={() => addToCart(product)}
        >
            Agregar
        </button>
    )
}
