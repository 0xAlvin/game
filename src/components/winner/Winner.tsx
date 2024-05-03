"use client"
import Link from "next/link";
import Gesture from "../gesture/Gesture";
import "./winner.css";
import { useEffect, useState } from "react";
export default function Winner(props: {
    outcome: {
        gesture: {
            player: string,
            house: string
        }
        player: boolean
        house: boolean
    },
    handlePlay: ()=>void
}) {
    const [outcome, setOutcome] = useState({
        gesture: {
            player: "",
            house: ""
        },
        player: false,
        house: false
    });
    useEffect(() => {
        if (props.outcome) {
            setOutcome(props.outcome);
        }
        if (localStorage.getItem("gesture")) {
            const savedGesture = JSON.parse(localStorage.getItem("gesture")!);
            const rules: { [key: string]: string[] } = {
                rock: ["scissors", "lizard"],
                paper: ["rock", "spock"],
                scissors: ["paper", "lizard"],
                lizard: ["spock", "paper"],
                spock: ["scissors", "rock"]
            }
            if (savedGesture.player === savedGesture.house) {
                setOutcome({
                    gesture: {
                        player: savedGesture.player,
                        house: savedGesture.house
                    },
                    player: false,
                    house: false
                });
                return;
            }
            if (rules[savedGesture.player].includes(savedGesture.house)) {
                setOutcome({
                    gesture: {
                        player: savedGesture.player,
                        house: savedGesture.house
                    },
                    player: true,
                    house: false
                });
                return;
            }
            if (rules[savedGesture.house].includes(savedGesture.player)) {
                setOutcome({
                    gesture: {
                        player: savedGesture.player,
                        house: savedGesture.house
                    },
                    player: false,
                    house: true
                });
                return;
            }
        }
    }, [props.outcome]);
    return (
        <div className="choices winner">
            <div className={`player_choice`}>
                <p>You Picked</p>
                <div className={`${outcome.player === true ? "won" : ""}`} />
                <Gesture gesture={outcome.gesture.player} Click={() => { }} />
            </div>
            <div className="result_text">
                <p>{
                    outcome.player === true ? "You Win" : (outcome.house === true ? "You Lose" : "Draw")
                    }</p>
                <Link href="/play" className="play_btn" onClick={props.handlePlay}>Play Again</Link>
            </div>
            <div className="house_choice">
                <p>The House Picked</p>
                <div className={`${outcome.house === true ? "won" : ""}`} />
                <Gesture gesture={outcome.gesture.house} Click={() => { }} />

            </div>
        </div>
    )
}