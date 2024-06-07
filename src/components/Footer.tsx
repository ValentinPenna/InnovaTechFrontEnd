import instagram from "../../public/instagram.png";
import twitter from "../../public/twitter.png";
import linkedin from "../../public/linkedin.png";
import github from "../../public/github.png";
import Link from "next/link";
export default function Footer() {
	return (
		<div className="flex max-w-[100%] items-center justify-between px-[37px] py-[9px] bg-persianIndigo z-10 min-h-[12.5vh] static bottom-0">
			
				<h1 className="relative w-fit font-rubik font-bold text-aliceBlue text-3xl tracking-[0] leading-[45px] whitespace-nowrap items-center">
					InnovaTech
				</h1>
			
			<div className="items-center relative gap-12 hidden md:inline-flex">
			<Link href="/contact">
                <h2 className="text-safetyOrange font-rubik font-semibold">
                    Contacto
                </h2>
            </Link>
            <Link href="/about-us">
                <h2 className="text-safetyOrange font-rubik font-semibold">
                    Sobre Nosotros
                </h2>
            </Link>
			</div>
			<div className="hidden sm:inline-flex items-center gap-3 relative">
				<a href="https://www.instagram.com"><img src={instagram.src} alt="Instagram" className="w-7 h-7"/></a>
				<a href="https://www.twitter.com"><img src={twitter.src} alt="Twitter" /></a>
				<a href="https://www.linkedin.com/in/valentin-penna-78a5832b6/"><img src={linkedin.src} alt="Linkedin" /></a>
				<a href="https://github.com/ValentinPenna"><img src={github.src} alt="Github" /></a>
			</div>
		</div>
	);
}