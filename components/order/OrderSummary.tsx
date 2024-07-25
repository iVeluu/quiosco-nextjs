"use client"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import formatCurrency from "@/src/utils"
import { OrderSchema } from "@/src/schema"
import { createOrder } from "@/actions/create-order-action"
import { toast } from "react-toastify"

export default function OrderSummary() {

    const order = useStore((state) => state.order)
    const clearOrder = useStore((state) => state.clearOrder)
    const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

    const handleCreateOrder = async ( formData : FormData ) => {
        const data = {
            name: formData.get('name'),
            total,
            order
        }

        const result = OrderSchema.safeParse(data)
        if(!result.success){
            result.error.issues.forEach((issue) => {
                toast.error(issue.message)
            })
            return
        }
        const response = await createOrder(data)
        if (response?.errors){
            response.errors.forEach((issue) => {
                toast.error(issue.message)
            })
        }

        toast.success('Pedido Realizado Correctamente')
        clearOrder()
    }
    
    return (
        <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
            <h1 className="text-4xl text-center font-black">Mi Pedido</h1>


            {order.length === 0 ? <p className="my-10 text-center">El carrito esta vacio</p> : (
                <div className="mt-5">
                    {order.map( item => (
                        <ProductDetails
                            key={item.id}
                            item={item}
                        />
                    ))}

                <p className="text-2xl mt-20 text-center">
                    Total a pagar {' '}
                    <span className="font-black text-indigo-500">{formatCurrency(total)}</span>
                </p>

                <form  
                    className="w-full mt-10 space-y-5"
                    action={handleCreateOrder}
                >

                    <input type="text" name="name" placeholder="Tu nombre" className="w-full border border-gray-100 bg-white p-2" />

                    <input 
                        type="submit" 
                        value="Confirmar Pedido" 
                        className="py-2 rounded-lg uppercase text-black hover:text-white border-4 border-black hover:bg-black w-full text-center cursor-pointer font-bold" 
                    />
                </form>
                </div>

            )}

        </aside>
    )
}
