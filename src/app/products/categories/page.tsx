import { categoriesDB } from "@/helpers/db";
import Link from "next/link";

export default function Categories() {
    return (
        <main className="flex min-h-[75vh] flex-col items-center justify-between p-12">
            <div className="flex flex-row items-center justify-center gap-10 w-full text-aliceBlue text-lg font-rubik font-semibold flex-wrap">
                {categoriesDB.map((category) => (
                    <Link
                        href={`/products/categories/${category.name}`}
                        key={category.name}
                        className="w-[40%]"
                        >
                        <div key={category.name} className="bg-persianIndigo px-6 py-3 rounded-3xl flex items-center justify-center">
                            <h3 className="text-2xl">{category.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}