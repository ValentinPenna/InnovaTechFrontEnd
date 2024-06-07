"use client";
import { registerUser } from "@/helpers/dcCalls";
import { validateRegister } from "@/helpers/formValidation";
import { RegisterErrorProps, RegisterProps } from "@/interfaces/types";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
	const router = useRouter();
	const [dataUser, setDataUser] = useState<RegisterProps>({
		email: "",
		password: "",
		name: "",
		address: "",
		phone: "",
	});
	const [errorUser, setErrorUser] = useState<RegisterErrorProps>({});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDataUser({
			...dataUser,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			if (Object.keys(errorUser).length > 0) return alert("Hay errores en el formulario");
			const user = await registerUser(dataUser);
			if (user) alert("Registrado exitosamente");
			router.push("/auth/login");
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const errors = validateRegister(dataUser);
		setErrorUser(errors);
	}, [dataUser]);

	return (
		<main className="flex min-h-[75vh] flex-col items-center justify-center p-12 gap-3">
			<h1 className="font-rubik font-bold text-aliceBlue text-3xl">Registrarse</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[90%] sm:w-1/2 lg:w-1/3">
				<label className="flex gap-3 text-aliceBlue font-outfit font-normal flex-col">
					Email:
					<input
						type="email"
						placeholder="example@example.com"
						name="email"
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
					Contraseña:
					<input
						type="password"
						placeholder="********"
						name="password"
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
				<label className="flex gap-3 text-aliceBlue font-outfit font-normal flex-col">
					Name:
					<input
						type="text"
						placeholder="John Doe"
						name="name"
						value={dataUser.name}
						onChange={handleChange}
						required
						className="w-full p-1 bg-persianIndigo text-aliceBlue font-outfit font-normal rounded-lg outline-none focus:outline-safetyOrange"
					/>
				</label>
				{errorUser.name && (
					<p className="text-safetyOrange font-outfit font-normal">
						{errorUser.name}
					</p>
				)}
				<label className="flex gap-3 text-aliceBlue font-outfit font-normal flex-col">
					Direccion:
					<input
						type="text"
						placeholder="Avellaneda 515"
						name="address"
						value={dataUser.address}
						onChange={handleChange}
						required
						className="w-full p-1 bg-persianIndigo text-aliceBlue font-outfit font-normal rounded-lg outline-none focus:outline-safetyOrange"
					/>
				</label>
				{errorUser.address && (
					<p className="text-safetyOrange font-outfit font-normal">
						{errorUser.address}
					</p>
				)}
				<label className="flex gap-3 text-aliceBlue font-outfit font-normal flex-col">
					Telefono:
					<input
						type="text"
						placeholder="+54 11 1234 5678"
						name="phone"
						value={dataUser.phone}
						onChange={handleChange}
						required
						className="w-full p-1 bg-persianIndigo text-aliceBlue font-outfit font-normal rounded-lg outline-none focus:outline-safetyOrange"
					/>
				</label>
				{errorUser.phone && (
					<p className="text-safetyOrange font-outfit font-normal">
						{errorUser.phone}
					</p>
				)}
				<button
					type="submit"
					className="text-aliceBlue font-outfit font-normal text-lg bg-safetyOrange rounded-lg w-48 self-center"
				>
					Registrarse
				</button>
			</form>
			<h3 className="text-aliceBlue font-outfit font-normal">Ya tienes cuenta? <Link href="/auth/login" className="text-safetyOrange font-outfit font-semibold">Ingresar</Link></h3>
		</main>
	);
}
