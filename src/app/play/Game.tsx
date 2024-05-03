"use client"

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Gesture from "@/components/gesture/Gesture";
import Winner from "@/components/winner/Winner";
import { ScoreContext } from "@/components/score/Score";


const random = (min = 0, max = 4) => Math.floor(Math.random() * (max - min + 1) + min);
let randomOption: string;


let result = { gesture: { player: "", house: "" }, player: false, house: false };
let saved: { player: string, house: string };

const getWinner = (g: string, mode: string, currentScore: number) => {
    const options = ["rock", "paper", "scissors"];
    const options2 = ["rock", "paper", "scissors", "lizard", "spock"];

    if (mode === "normal") {
        randomOption = options[random(0, 2)];
    }
    else {
        randomOption = options2[random(0, 4)];
    }

    result.gesture.house = randomOption
    result.gesture.player = g;

    const rules: { [key: string]: string[] } = {
        rock: ["scissors", "lizard"],
        paper: ["rock", "spock"],
        scissors: ["paper", "lizard"],
        lizard: ["spock", "paper"],
        spock: ["scissors", "rock"]
    }
    if (g === randomOption) {
        result.player = false;
        result.house = false;
        return null;
    }
    const userChoice = rules[g];
    if (userChoice.includes(randomOption)) {
        result.player = true;
        result.house = false;
        return (currentScore + 1);
    } else if (rules[randomOption].includes(g)) {
        result.house = true;
        result.player = false;

        return (currentScore - 1 < 0) ? null : currentScore - 1;
    }
    return null;
}

function Choose({ mode }: { mode: string }) {
    const { score, setScore } = useContext(ScoreContext) as {
        score: number;
        setScore: React.Dispatch<React.SetStateAction<number>>;
    };
    const [gesture, setGesture] = useState("");
    const [gotwin, setGotwin] = useState(false);

    useEffect(() => {
        const savedGesture = localStorage.getItem('gesture');
        if (savedGesture) {
            saved = JSON.parse(savedGesture);
            setGesture(saved.player);
        }
    }, []);

    function handleGesture(g: string) {

        setGesture(g);
        const result = getWinner(g, mode, score);

        if (result !== null){
            setScore(result);
        }

        localStorage.setItem("gesture", JSON.stringify({ player: g, house: randomOption }));

    }
    function playAgain() {
        localStorage.setItem("gesture", JSON.stringify({ player: "", house: "" }));
    }
    useEffect(() => {
        const timeout = setTimeout(() => {
            setGotwin(true);
        }, 100000);
        return () => clearTimeout(timeout);
    }, []);
    return (gesture !== "" ?
        gotwin ?
            <Winner outcome={result} handlePlay={playAgain} />
            :
            (<div className="choices">
                <div className="player_choice">
                    <p>You Picked</p>
                    <Gesture gesture={gesture || saved.player} Click={() => { }} />
                </div>
                <div className="house_choice">
                    <p>The House Picked</p>
                    <Gesture gesture={randomOption || saved.house} Click={() => { }} />
                </div>
            </div>)
        :
        <>
            <Image
                src={mode === "normal" ? "/images/bg-triangle.svg" : "/images/bg-pentagon.svg"}
                alt="triangle"
                width={200}
                height={200}
                className="game_view_img"
            />
            {mode === "normal" ? (
                <div className="game_gestures">
                    <Gesture gesture="rock" Click={handleGesture} />
                    <Gesture gesture="paper" Click={handleGesture} />
                    <Gesture gesture="scissors" Click={handleGesture} />
                </div>
            ) : (
                <div className="game_gestures2">
                    <Gesture gesture="lizard" Click={handleGesture} />
                    <Gesture gesture="spock" Click={handleGesture} />
                    <Gesture gesture="scissors" Click={handleGesture} />
                    <Gesture gesture="paper" Click={handleGesture} />
                    <Gesture gesture="rock" Click={handleGesture} />
                </div>

            )}
        </>
    )
}
export default function Game({ mode }: { mode: string }) {
    return (
        <div>
            <Choose mode={mode} />
        </div>
    )
}