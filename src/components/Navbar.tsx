"use client";
import logo from "../../public/logo.png";
import Link from "next/link";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { userSession } from "@/interfaces/types";
import { usePathname } from "next/navigation";
import cart from "../../public/cart.png";
import menu from "../../public/menu.png";
import { categoriesDB } from "@/helpers/db";

export default function Navbar() {
	const pathname = usePathname();
	const [searchData, setSearchData] = useState();
	const [userData, setUserData] = useState<userSession>();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		if(typeof window !== "undefined" && window.localStorage) {
			const userSession = localStorage.getItem("userSession");
			setUserData(JSON.parse(userSession!));
		}
		setIsMenuOpen(false);
	}, [pathname]);

	const handleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenuOnResize = () => {
		if (window.innerWidth > 768) {
		  setIsMenuOpen(false);
		}
	  };
	
	  useEffect(() => {
		window.addEventListener('resize', closeMenuOnResize);
		return () => {
		  window.removeEventListener('resize', closeMenuOnResize);
		};
	  }, []);

	return (
		<nav className="flex w-full items-center justify-between px-[37px] sticky bg-persianIndigo z-50 min-h-[12.5vh] py-2">
			<div className=" w-fit flex items-center">
				<Link href="/" className="h-full w-full flex items-center gap-3">
				<img
					className="relative h-[11vh] object-cover cursor-pointer"
					alt="InnovaTech Logo"
					src={logo.src}
					/>
				<h1 className="w-fit font-rubik font-bold text-aliceBlue text-3xl whitespace-nowrap hidden sm:block">
					InnovaTech
				</h1>
				</Link>
			</div>
			<div className="hidden md:block">
			<SearchBar full={false}/>
			</div>
			<div className="items-center relative hidden md:block">
				{userData ? (
					<div className="inline-flex items-center gap-6 relative">
					<Link href="/cart">
						<img src={cart.src} alt="Cart" className="w-8 h-8"/>
					</Link>
					<Link href="/dashboard" className="inline-flex items-center gap-3 relative">
					<p className="font-rubik font-semibold text-aliceBlue text-lg">
						¡Hola, {userData.userData.name}!
					</p>
						<img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Profile" className="w-12 h-12"/>
					</Link>
					</div>
				) : (
					<div className="inline-flex items-center gap-3 lg:gap-6">
					<Link href="/auth/register">
						<button className="box-border bg-aliceBlue h-12 items-center justify-center px-4 relative rounded-[8px] shadow-button-shadow text-safetyOrange font-rubik font-semibold text-sm">
							Registrarse
						</button>
					</Link>
					<Link href="/auth/login">
						<button className="box-border bg-safetyOrange h-12 items-center justify-center px-4 relative rounded-[8px] shadow-button-shadow text-aliceBlue font-rubik font-semibold text-sm">
							Ingresar
						</button>
					</Link>
					</div>
				)}
			</div>

			<div className="block md:hidden">
				<button onClick={handleMenu}>
				<img src={menu.src} alt="Menu" className="w-10 h-10" />
				</button>
			</div>


			{isMenuOpen && (
				<>
				<div className="absolute top-[12.5vh] right-0 w-3/4 sm:w-2/3 h-fit bg-persianIndigo p-4 z-50 flex flex-col gap-3">
				<SearchBar full={true}/>
				{userData ? (
					<div className="inline-flex items-center justify-end gap-2 sm:gap-6 relative flex-wrap">
					<Link href="/cart">
						<img src={cart.src} alt="Cart" className="w-8 h-8"/>
					</Link>
					<Link href="/dashboard" className="inline-flex items-center gap-3 relative flex-wrap">
					<p className="font-rubik font-semibold text-aliceBlue text-lg w-fit">
						¡Hola, {userData.userData.name}!
					</p>
						<img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Profile" className="w-12 h-12"/>
					</Link>
					</div>
				) : (
					<div className="flex flex-row flex-wrap items-center justify-end gap-2">
					<Link href="/auth/register">
						<button className="box-border bg-aliceBlue inline-flex h-10 sm:h-12 items-center justify-center px-4 relative rounded-[8px] shadow-button-shadow text-safetyOrange font-rubik font-semibold text-sm">
							Registrarse
						</button>
					</Link>
					<Link href="/auth/login">
						<button className="box-border bg-safetyOrange inline-flex h-10 sm:h-12 items-center justify-center px-4 relative rounded-[8px] shadow-button-shadow text-aliceBlue font-rubik font-semibold text-sm">
							Ingresar
						</button>
					</Link>
					</div>
				)}
				<hr className="w-full h-1 border-safetyOrange"/>
					<menu className="flex flex-col items-end justify-center gap-2 w-full text-safetyOrange text-lg font-rubik font-semibold min-h-12 flex-wrap">
						{categoriesDB.map((category) => (
						<Link href={`/products/categories/${category.name}`} key={category.name}>
						<li key={category.name}>{category.name}</li>
						</Link>
						))}
      				</menu>
					<hr className="w-full border-safetyOrange"/>
					<div className="items-end gap-3 flex flex-col">
						<Link href="/contact">
							<h2 className="text-aliceBlue font-rubik font-semibold">
								Contacto
							</h2>
						</Link>
						<Link href="/about-us">
							<h2 className="text-aliceBlue font-rubik font-semibold">
								Sobre Nosotros
							</h2>
						</Link>
					</div>
					</div>
			</>
			)}
				

		</nav>
	);
}
