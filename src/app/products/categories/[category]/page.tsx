import { categoriesDB } from "@/helpers/db";
import RenderProducts from "@/components/RenderProducts";
import { getProducts } from "@/helpers/dcCalls";
import React from "react";
import IProduct from "@/interfaces/types";

export default async function ProductsCategory({params}:any) {
    const products = await getProducts()
    const category = (categoriesDB.find((category) => category.name === params.category))
    const categoryId = category ? category.id : ""

    if (!categoryId) return (<div className="flex flex-col w-full min-h-[75vh] justify-center items-center font-rubik font-semibold text-5xl text-aliceBlue">Category not found</div>)
    const productsFiltered = products.filter((product:IProduct) => {
        return product.categoryId === categoryId
    })

    return (
        <div className="flex flex-col w-full min-h-[75vh] items-center">
            <h1 className="text-4xl font-rubik font-bold text-aliceBlue mt-12">{params.category}</h1>
            <div className="flex flex-row w-[90%] flex-wrap justify-start pt-12">
            {productsFiltered.map((product:IProduct) => {
                    return(

                        <RenderProducts key={product.id} product={product} />
                    )
                }
            )}
            </div>
        </div>
    );
}