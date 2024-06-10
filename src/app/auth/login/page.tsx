"use client";
import { loginUser } from "@/helpers/dcCalls";
import { validateLogin } from "@/helpers/formValidation";
import { LoginErrorProps, LoginProps } from "@/interfaces/types";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Login() {
	const router = useRouter();

	const [dataUser, setDataUser] = useState<LoginProps>({
		email: "",
		password: "",
	});
	const [errorUser, setErrorUser] = useState<LoginErrorProps>({});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDataUser({
			...dataUser,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			if(Object.keys(errorUser).length > 0) return alert("Hay errores en el formulario");
			const response = await loginUser(dataUser.email, dataUser.password);
			const { token, user } = response;
			if(token && user) {
				localStorage.setItem("userSession", JSON.stringify({ token, userData: user }));
				alert("Login exitoso");
				router.push("/");
			} else if (response.message === "Invalid password") {
				alert ("Credenciales incorrectas");
			}
		} catch (error: any) {
			alert(error);
		}
	};

	useEffect(() => {
		const errors = validateLogin(dataUser);
		setErrorUser(errors);
	}, [dataUser]);
	return (
		<main className="flex min-h-[75vh] flex-col items-center justify-center p-12 gap-3">
			<h1 className="font-rubik font-bold text-aliceBlue text-3xl">Login</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[90%] sm:w-1/2 lg:w-1/3">
				<label className="flex gap-3 text-aliceBlue font-outfit font-normal flex-col">
					Email:
					<input
						type="email"
						name="email"
						placeholder="example@example.com"
						value={dataUser.email}
						onChange={handleChange}
						required
						className="w-full p-1 bg-persianIndigo text-aliceBlue font-outfit font-normal rounded-lg outline-none focus:outline-safetyOrange"
					/>
				</label>
				{errorUser.email && (
					<p className="text-safetyOrange font-outfit font-normal">
						{errorUser.email}
					</p>
				)}
				<label className="flex gap-3 text-aliceBlue font-outfit font-normal flex-col">
					Password:
					<input
						type="password"
						name="password"
						placeholder="********"
						value={dataUser.password}
						onChange={handleChange}
						required
						className="w-full p-1 bg-persianIndigo text-aliceBlue font-outfit font-normal rounded-lg outline-none focus:outline-safetyOrange"
					/>
				</label>
				{errorUser.password && (
					<p className="text-safetyOrange font-outfit font-normal">
						{errorUser.password}
					</p>
				)}
				<button
					type="submit"
					className="text-aliceBlue font-outfit font-normal text-lg bg-safetyOrange rounded-lg w-48 self-center"
				>
					Ingresar
				</button> 
			</form>
			<h3 className="text-aliceBlue font-outfit font-normal">No tienes cuenta? <Link href="/auth/register" className="text-safetyOrange font-outfit font-semibold">Registrate</Link></h3>
		</main>
	);
}
