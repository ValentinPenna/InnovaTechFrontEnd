import IProduct, { RegisterProps } from "@/interfaces/types";
import axios, { AxiosInstance } from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getProducts = async () =>{
    try {
        const response = await fetch(`${apiUrl}/products`, {
            method: "GET",
            // cache: "no-cache",
            next: { revalidate: 600 },
        })
        const products = await response.json()
        return products
    } catch (error) {
        console.log(error)
    }
}

export const getProductById = async (id: number) =>{
    try {
        const products = await getProducts()
        const product = products.find((product: IProduct) => product.id === Number(id))
        if (!product) throw new Error("Product not found")
        return product
    } catch (error) {
        console.log(error)
    }
}

export const loginUser = async (email: string, password: string) =>{
    try {
        const response = await fetch(`${apiUrl}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            cache: "no-cache",
        })
        const user = await response.json()
        return user
    } catch (error) {
        console.log(error)
    }
}

export const registerUser = async ({name, email, password, address, phone}: RegisterProps) =>{
    try {
        const response = await fetch(`${apiUrl}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( {name, email, password, address, phone} ),
            cache: "no-cache",
        })
        const user = await response.json()
        return user
    } catch (error) {
        console.log(error)
    }
}

export const createOrder = async ( products: number[], token: string) =>{
    try {
        const response = await fetch(`${apiUrl}/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({ products }),
            cache: "no-cache",
        })
        const order = await response.json()
        return order
    } catch (error) {
        console.log(error)
    }
}

export const getOrdersByUser = async (token: string) =>{
    try {
        console.log(token)
        const response = await fetch(`${apiUrl}/users/orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: token,
            },
            cache: "no-cache",
        })
        const orders = await response.json()

        return orders
    } catch (error) {
        console.log(error)
    }
}