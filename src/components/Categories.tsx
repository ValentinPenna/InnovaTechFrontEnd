import Link from "next/link";
import { categoriesDB } from "@/helpers/db";
export default function Categories() {
    return (
        <menu className="flex flex-row items-center justify-center gap-6 w-full bg-safetyOrange text-persianIndigo text-lg font-rubik font-semibold min-h-12 flex-wrap">
        {categoriesDB.map((category) => (
          <Link href={`/products/categories/${category.name}`} key={category.name}>
          <li key={category.name}>{category.name}</li>
          </Link>
        ))}
      </menu>
    );
}