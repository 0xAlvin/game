"use client";

import { createContext, useEffect, useState } from "react";
import Board from "../board/Board";

export const ScoreContext = createContext<{
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
} | undefined>(undefined);

export default function Score({ children }: { children: React.ReactNode }) {
    const [score, setScore] = useState<number>(0);

    const [mode, setMode] = useState("");

    useEffect(() => {
        localStorage.setItem("score", score.toString());
    }, [score]);

    useEffect(() => {
        localStorage.getItem("mode");
    }, []);

    return (
        <ScoreContext.Provider value={{ score, setScore }}>
            <Board score={score} mode={mode} />
            {children}
        </ScoreContext.Provider>
    );
}