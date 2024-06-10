"use client"
import { createOrder } from "@/helpers/dcCalls"
import IProduct, { userSession } from "@/interfaces/types"
import { redirect, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function Cart() {
    const [cart, setCart] = useState<IProduct[]>([])
    const [totalCart, setTotalCart] = useState<number>(0)
    const [userData, setUserData] = useState<userSession>()

    useEffect(() => {
        if(typeof window !== "undefined" && window.localStorage){
            const userData: userSession = JSON.parse(localStorage.getItem("userSession")!)
            setUserData(userData)
            !userData?.token && redirect("/auth/login")
        }

        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
        if(storedCart) {
        let totalcart = 0
        storedCart?.map((product: IProduct) => {
        totalcart += product.price
        })
        setTotalCart(totalcart)
        setCart(storedCart)
        }
    }, [])

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
        if(storedCart) {
        let totalcart = 0
        storedCart?.map((product: IProduct) => {
        totalcart += product.price
        })
        setTotalCart(totalcart)
        setCart(storedCart)
        }
    }, [cart])

    const handleClick = async () => {
        try {
            if(cart.length > 0) {
                const idProducts = new Set(cart.map((product: IProduct) => product.id))
                await createOrder(Array.from(idProducts), userData?.token!)
                alert ("Compra realizada")
                setCart([])
                setTotalCart(0)
                localStorage.setItem("cart", "[]")
            }else{
                alert("No hay elementos en el carrito")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleDeleteProduct = (id: number) => {
        const newCart: IProduct[] = [...cart]
        const deletedCart: IProduct[] = []
        cart.map((product: IProduct) => {
            if(product.id === id) deletedCart.push(product)
        })
        newCart.splice(newCart.indexOf(deletedCart[0]), 1)
        setCart(newCart)
        localStorage.setItem("cart", JSON.stringify(newCart))
    }

    return (
        <main className="flex min-h-[75vh] flex-col items-center p-12 gap-3">
            <h1 className="text-4xl font-rubik font-bold text-aliceBlue">Carrito</h1>
            <div className="flex flex-col gap-3 font-outfit font-normal text-aliceBlue text-xl w-full items-center">
                {
                    cart?.length > 0
                        ? cart.map((product: IProduct) => (
                            <div key={product.id} className="flex flex-row flex-wrap gap-3 font-outfit font-normal text-aliceBlue text-xl bg-persianIndigo p-4 rounded-xl w-[50%] sm:w-[40%] justify-between">
                                <button onClick={() => handleDeleteProduct(product.id)}>X</button>
                                <p>{product.name}</p>
                                <p>${product.price}</p>
                            </div>
                        ))
                        : <p className="text-aliceBlue">No hay elementos en el carrito</p>
                }
            </div>
            <div className="flex flex-col gap-3 font-outfit font-normal text-aliceBlue text-xl w-[50%] sm:w-[40%]">
                <p className="text-aliceBlue flex justify-end p-4">Total: ${totalCart}</p>
                <button onClick={handleClick} className="bg-safetyOrange text-persianIndigo font-rubik font-bold text-xl py-2 px-4 rounded-xl hover:bg-persianIndigo hover:text-safetyOrange">Comprar</button>
            </div>
        </main>
    )
}