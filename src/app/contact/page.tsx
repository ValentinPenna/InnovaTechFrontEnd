import instagram from "../../../public/instagram.png";
import twitter from "../../../public/twitter.png";
import linkedin from "../../../public/linkedin.png";
import github from "../../../public/github.png";

export default function Contact() {
    return (
        <main className="flex min-h-[75vh] h-max flex-col items-center justify-center p-8">
            <div className="flex flex-col items-center gap-6 relative between">
                <h1 className="text-4xl font-rubik font-bold text-aliceBlue">Contacto</h1>
                <h3 className="text-2xl font-rubik font-normal text-aliceBlue">Puedes contactarte conmigo por Correo, Telefono, LinkedIn o por redes.</h3>
                <p className="text-xl font-rubik font-normal text-aliceBlue">Email: <a href="mailto:example@example.com">InnovaTech@example.com</a></p>
                <p className="text-xl font-rubik font-normal text-aliceBlue">Teléfono: 1234567890</p>
                <div className="inline-flex items-center gap-6 relative">
                    <a href="https://www.instagram.com"><img src={instagram.src} alt="Instagram" /></a>
                    <a href="https://www.twitter.com"><img src={twitter.src} alt="Twitter" /></a>
                    <a href="https://www.linkedin.com/in/valentin-penna-78a5832b6/"><img src={linkedin.src} alt="Linkedin" /></a>
                    <a href="https://github.com/ValentinPenna"><img src={github.src} alt="Github" /></a>
                </div>
            </div>
        </main>
    );
}