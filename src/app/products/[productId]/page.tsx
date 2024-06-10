"use client";
import React, { useEffect, useState } from "react";
import { getProductById } from "@/helpers/dcCalls";
import IProduct, { userSession } from "@/interfaces/types";
import { useRouter } from "next/navigation";

export default function ProductDetail({params}:{params: {productId: string}}) {
    const router = useRouter()
    const [product, setProduct] = useState<IProduct>()
    const [userData, setUserData] = useState<userSession>()
    const {productId} = params

    useEffect(() => {
        if(typeof window !== "undefined" && window.localStorage){
            const userData = localStorage.getItem("userSession")
            setUserData(JSON.parse(userData!))
        }

        const fetchData = async () => {
            const product: IProduct = await getProductById(Number(productId))
            setProduct(product)
        }
        fetchData()
    }, [])

    const handleAddCart = (e: any) => {
        if(!userData?.token){
            alert("Debes estar logueado")
        } else {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]")
            const productExist = cart.some((product: IProduct) => {
                if(product.id === Number(e?.target?.id)) return true
                return false
            })
            if(productExist){
                alert("El producto ya existe")
                router.push("/cart")
            } else {
                cart.push(product)
                localStorage.setItem("cart", JSON.stringify(cart))
                alert("Agregado al carrito")
            }
        }
    }
    return (
        <main className="flex min-h-[75vh] flex-col items-center justify-between p-6 sm:p-12">
            <div className="flex flex-col md:flex-row w-full lg:w-[90%] bg-persianIndigo p-9 gap-9 rounded-[3rem] items-center">
                <img src={product?.image} alt="Product" className="max-w-48 h-48  sm:max-w-72 sm:h-72  lg:max-w-96 lg:h-96"/>
                <div className="flex flex-col text-aliceBlue gap-6 justify-between">
                    <div className="flex flex-col gap-3">
                    <h1 className="text-3xl">{product?.name}</h1>
                    <p className="text-xl">{product?.description}</p>
                    </div>
                    <div className="flex flex-row justify-between font-outfit font-normal text-xl">
                    <div className="flex flex-col gap-3 font-outfit font-normal text-xl">
                        <p>Stock: {product?.stock}</p>
                        <p>${product?.price}</p>
                    </div>
                    <button onClick={handleAddCart} className="bg-safetyOrange h-fit p-3 gap-2 rounded-xl">Añadir al carrito</button>
                    </div>
                </div>
            </div>
        </main>
    );
}