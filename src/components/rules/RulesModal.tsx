"use client"

import "./rules.css";
import Image from "next/image";
import { useState } from "react";

function Modal(props: { state: boolean, handleClick: () => void }) {
    let mode;
    if (typeof window !== "undefined") {
        mode = localStorage?.getItem("mode") ?? "normal";
    }
    if (props.state)
        return (
            <>
                <div className="background" />
                <div className="modal">
                    <div className="upper">
                        <p>RULES</p>
                        <Image
                            src="/images/icon-close.svg"
                            alt="close"
                            className="close"
                            width={20}
                            height={20}
                            priority
                            onClick={props.handleClick}
                        />
                    </div>
                    <Image
                        src= {mode === "extra" ? "/images/image-rules-bonus.svg" : "/images/image-rules.svg"}
                        alt="rules"
                        className="rules-img"
                        width={300}
                        height={300}
                        priority
                    />

                </div>
            </>
        )
}

export default function Rules() {
    const [open, setOpen] = useState(false);

    function handleModal() {
        setOpen(!open);
    }
    return (
        <>
            <Modal state={open} handleClick={handleModal} />
            <div className="rules-btn">
                <button type="button" role="button" onClick={handleModal}>RULES</button>
            </div>
        </>
    )
}