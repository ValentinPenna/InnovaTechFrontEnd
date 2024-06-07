"use client"
import RenderProducts from "@/components/RenderProducts";
import { getProducts } from "@/helpers/dcCalls"
import IProduct from "@/interfaces/types";
import { useEffect, useState } from "react";


export default function Search({params}:{params: {searchData: string}}) {
    const [search, setSearch] = useState<string>("")
    const [products, setProducts] = useState<IProduct[]>([]);
    const {searchData} = params
    useEffect(() => {
        const fetchData = async () => {
            const products = await getProducts()
            setProducts(products)
        }
        fetchData()
        const searchFormated = searchData.split("%20").join(" ")
        setSearch(searchFormated)
    }, [])
    const searchProducts = products.filter((product: IProduct) => product.name.toLowerCase().includes(search.toLowerCase()));
    return(
        <main className="flex min-h-[75vh] flex-col items-center justify-between p-12">
            <h1 className="text-4xl font-rubik font-bold text-aliceBlue">Coinciden con tu busqueda: {search}</h1>
            <div className="flex flex-row w-[90%] flex-wrap justify-start pt-12">
                {searchProducts.map((product: IProduct) => (
                    <RenderProducts key={product.id} product={product} />
                ))}
            </div>
        </main>
    )
}