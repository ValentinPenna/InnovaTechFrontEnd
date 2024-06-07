import RenderProducts from "@/components/RenderProducts";
import { getProducts } from "@/helpers/dcCalls";
import IProduct from "@/interfaces/types";

export default async function ViewProducts() {
  const products = await getProducts()
  return (
    <main className="flex min-h-[75vh] flex-col items-center justify-between p-12">
      <h1 className="text-4xl font-rubik font-bold text-aliceBlue">Todos los productos</h1>
      <div className="flex flex-row w-[90%] flex-wrap justify-start pt-12">
      {products.map((product:IProduct) => (
        <RenderProducts key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}