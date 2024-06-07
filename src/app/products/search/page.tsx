"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Search() {
    const router = useRouter();

    useEffect(() => {
        router.push("/products")
    }, [])
}