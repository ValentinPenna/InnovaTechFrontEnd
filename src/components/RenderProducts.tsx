import Link from "next/link"
import IProduct from "@/interfaces/types"
import React from "react"
export default function RenderProducts({product}: {product: IProduct}) {
    return (
            <div key={product.id} className="flex flex-col w-[100%] sm:w-[50%] lg:w-[33%] xl:w-[25%] p-6 items-center">
                <Link href={`/products/${product.id}`} key={product.id} className="w-full flex flex-col items-center gap-3 p-4 bg-persianIndigo rounded-xl">
                    <img src={product.image} alt="Product" className="max-w-48 max-h-48 flex self-center text-aliceBlue"/>
                    <div className="flex flex-col w-max items-start self-start">
                    <h2 className="text-safetyOrange font-rubik font-normal"><strong>{product.name}</strong></h2>
                    <p className="text-aliceBlue font-rubik font-semibold">${product.price}</p>
                    </div>
                </Link>
            </div>
    )
}

