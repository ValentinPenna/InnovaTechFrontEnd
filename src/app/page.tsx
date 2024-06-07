import RenderProducts from "@/components/RenderProducts";
import headerbg from "../../public/headerbg.jpg";
import Categories from "@/components/Categories";
import { getProducts } from "@/helpers/dcCalls";
import IProduct from "@/interfaces/types";

export default async function Home() {
  const products = await getProducts()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="hidden md:block w-full">
      <Categories />
      </div>
      <div className="relative">
        <img src={headerbg.src} alt="Header" className="w-full relative z-1" />
        <div className="absolute z-10 top-0 left-0 w-full h-full flex items-center justify-center flex-col">
          <h1 className="text-safetyOrange font-rubik font-semibold text-2xl sm:text-4xl md:text-5xl lg:text-7xl text-center">
            Llevamos la tecnologia<br />hacia vos
          </h1>
          <p className="text-aliceBlue font-rubik font-normal text-sm sm:text-xl md:text-2xl lg:text-2xl text-center flex flex-wrap">Todo lo que puedas necesitar para aprovechar la red al máximo</p>
        </div>
      </div >
      <div className="flex flex-row w-[90%] flex-wrap justify-start pt-12">
      {products.map((product:IProduct) => (
        <RenderProducts key={product.id} product={product} />
      ))}
      </div>
    </main>
  );
}
