"use client"
import { userSession } from "@/interfaces/types"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
export default function Dashboard() {
    const [userData, setUserData] = useState<userSession>()
    const router = useRouter()
    useEffect(() => {
        const userSession = localStorage.getItem("userSession")
        if(!userSession) return router.push("/auth/login")
        setUserData(JSON.parse(userSession))
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("userSession")
        localStorage.removeItem("cart")
        router.push("/")
    }
    return (
        <main className="flex min-h-[75vh] flex-col items-center p-10 gap-6">
            <h1 className="text-4xl font-rubik font-bold text-aliceBlue">¡Hola, {userData?.userData.name}!</h1>
            <div className="flex flex-col gap-6 bg-persianIndigo rounded-xl p-6 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
                <div className="flex gap-6 flex-row text-aliceBlue text-xl font-outfit font-semibold justify-between flex-wrap">
                    <p className="text-safetyOrange">Nombre:</p>
                    <p>{userData?.userData.name}</p>
                </div>
                <div className="flex gap-6 flex-row text-aliceBlue text-xl font-outfit font-semibold justify-between flex-wrap">
                    <p className="text-safetyOrange">Email:</p>
                    <p>{userData?.userData.email}</p>
                </div>
                <div className="flex gap-6 flex-row text-aliceBlue text-xl font-outfit font-semibold justify-between flex-wrap">
                    <p className="text-safetyOrange">Dirección:</p>
                    <p className="flex flex-wrap">{userData?.userData.address}</p>
                </div>
                <div className="flex gap-6 flex-row text-aliceBlue text-xl font-outfit font-semibold justify-between flex-wrap">
                    <p className="text-safetyOrange">Numero de teléfono:</p>
                    <p>{userData?.userData.phone}</p>
                </div>
                <div className="flex gap-6 flex-col sm:flex-row justify-between">
                    <button className="bg-safetyOrange p-3 rounded-xl text-aliceBlue text-xl font-rubik font-semibold w-2/3 sm:w-[30%] self-center hover:bg-aliceBlue hover:text-safetyOrange" onClick={handleLogout}>Logout</button>
                    <button className="bg-safetyOrange p-3 rounded-xl text-aliceBlue text-xl font-rubik font-semibold w-2/3 sm:w-[30%] self-center hover:bg-aliceBlue hover:text-safetyOrange" onClick={() => router.push("/dashboard/orders")}>Ver pedidos</button>
                </div>
            </div>
        </main>
    )
}