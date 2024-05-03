"use client"

import { useRouter } from "next/navigation"

export default function Home() {
    let mode: string = "";
    if (typeof window !== "undefined") {
        mode = localStorage?.getItem("mode") ?? "normal";
    }
    const router = useRouter()
    const handleClick = () => {
        router.push(`${"/play/" + mode}`)
    }

    return (
        handleClick()
    );
}