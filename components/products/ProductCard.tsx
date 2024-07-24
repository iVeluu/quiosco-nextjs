import formatCurrency from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product } : ProductCardProps) {
    return (
        <div className="border bg-white rounded-3xl shadow-lg shadow-indigo-100  ">

            <Image
                width={400}
                height={500}
                src={`/products/${product.image}.jpg`}
                alt={`Imagen del platillo ${product.name}`}
                className="rounded-t-3xl"
            />

            <div className="p-5">
                <h3 className="font-bold text-2xl">{ product.name }</h3>
                <p className="mt-5 text-4xl text-indigo-500 font-black">
                    {formatCurrency(product.price)}
                </p>
                <AddProductButton 
                    product={product}
                />
            </div>
        </div>
    )
}
