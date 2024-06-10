"use client"
import { getOrdersByUser } from '@/helpers/dcCalls'
import { userSession } from '@/interfaces/types'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Orders() {
    const [orders, setOrders] = useState([])
    const [userSession, setUserSession] = useState<userSession>()

    useEffect(() => {
        if(typeof window !== "undefined" && window.localStorage) {
            const userData: userSession = JSON.parse(localStorage.getItem("userSession")!)
            setUserSession(userData)
            !userData?.token && redirect("/auth/login")
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const orders = await getOrdersByUser(userSession?.token!)
            if (orders) setOrders(orders)
        }

        fetchData()
    }, [userSession])

    return (
        <main className="flex min-h-[75vh] flex-col items-center p-6 md:p-12 gap-6">
            <h1 className="text-4xl font-rubik font-bold text-aliceBlue">Pedidos</h1>
            <div className='flex flex-col w-full sm:w-[90%] gap-6'>
                {
                    orders.length > 0 ? orders.map((order:any) => (
                        <div key={order.id} className='flex flex-row flex-wrap gap-6 bg-persianIndigo rounded-xl p-6 w-[80%] sm:w-[75%] lg:w-[60%] self-center justify-between'>
                            <h3 className="text-2xl font-rubik font-normal text-aliceBlue">Fecha: {(new Date(order.date)).toLocaleDateString()}</h3>
                            <h3 className="text-2xl font-rubik font-normal text-aliceBlue">Status: {order.status}</h3>
                        </div>
                    )) : (
                        <h3 className="text-2xl font-rubik font-normal text-aliceBlue">No hay pedidos</h3>
                    )
                }
            </div>
        </main>
    )
}