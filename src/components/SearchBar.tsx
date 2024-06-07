import React, { useEffect, useState } from 'react';
import search from '../../public/search.png';
import IProduct from '@/interfaces/types';
import { getProducts } from '@/helpers/dcCalls';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SearchBar({full}:any) {
    const [searchData, setSearchData] = useState<string>("");
    const [products, setProducts] = useState<IProduct[]>([]);
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        getProducts()
        .then(res => setProducts(res))
        .catch(err => console.error(err))
    }, [])
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setSearchData(event.target.value);
        setShowSearch(true);
    }

    const searchProducts = products.filter(product => product.name.toLowerCase().includes(searchData.toLowerCase()));

    const handleClickOutside = (e:MouseEvent) => {
        const searchInput = document.getElementById('search-input');
        if (searchInput && !searchInput.contains(e.target as Node)) {
          setShowSearch(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);

    const handleClick = () => {
        router.push(`/products/search/${searchData}`)
        setShowSearch(false)
    }

    return (
        <>
       
        {!full? (
            <div className="inline-flex items-center relative">
            <input
            type="text"
            placeholder="Buscar..."
            className="flex w-36 lg:w-80 xl:w-[30rem] h-12 items-start justify-end relative outline-none bg-aliceBlue rounded-[50px] rounded-r-none border-[3px] border-solid border-safetyOrange px-6 text-xl"
            onChange={handleChange}
            id='search-input'
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
            />
            {
                showSearch && searchData !== "" && searchProducts.length > 0 && (
                    <ul className='bg-persianIndigo absolute top-full left-[10%] w-28 lg:w-64 xl:w-96 overflow-y-auto rounded-2xl border-[3px] border-solid border-safetyOrange text-xl border-t-0 rounded-t-none'>
                        {searchProducts.map(product => (
                            <Link href={`/products/${product.id}`} key={product.id}>
                                <li className='p-3 hover:bg-safetyOrange text-aliceBlue font-outfit font-normal' key={product.id} onClick={() => setShowSearch(false)}>{product.name}</li>
                            </Link>
                        ))}
                    </ul>
                )
            }
            <button className="bg-safetyOrange h-12 px-3 rounded-[50px] rounded-l-none" onClick={handleClick}>
                <img
                    alt="Search"
                    src={search.src}
                    className="w-8 h-8 relative" />
            </button>
            </div>
        ):(
            <div className="inline-flex items-center relative w-full">
            <input
            type="text"
            placeholder="Buscar..."
            className="flex w-full h-12 items-start justify-end relative outline-none bg-aliceBlue rounded-[50px] rounded-r-none border-[3px] border-solid border-safetyOrange px-6 text-xl"
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
            />
            <button className="bg-safetyOrange h-12 px-3 rounded-[50px] rounded-l-none" onClick={handleClick}>
                <img
                    alt="Search"
                    src={search.src}
                    className="w-8 h-8 relative" />
            </button>
            </div>
        )
        }
         </>
    )
}