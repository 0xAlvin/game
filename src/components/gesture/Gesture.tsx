"use client"

import Image from "next/image";
import "./gesture.css";

export default function Gesture(props: { gesture: string, Click: (g:string) => void , className?: string}) {
    const imageSize = 200;
    const gesture = {
        scissors: <Image src="/images/icon-scissors.svg" width={imageSize} height={imageSize} alt="scissors" className="gesture-img" />,
        rock: <Image src="/images/icon-rock.svg" width={imageSize} height={imageSize} alt="scissors" className="gesture-img" />,
        paper: <Image src="/images/icon-paper.svg" width={imageSize} height={imageSize} alt="scissors" className="gesture-img" />,
        lizard: <Image src="/images/icon-lizard.svg" width={imageSize} height={imageSize} alt="scissors" className="gesture-img" />,
        spock: <Image src="/images/icon-spock.svg" width={imageSize} height={imageSize} alt="scissors" className="gesture-img" />
    };
    const selectedGesture = () => {
        switch (props.gesture) {
            case "scissors":
                return gesture.scissors;
            case "rock":
                return gesture.rock;
            case "paper":
                return gesture.paper
            case "lizard":
                return gesture.lizard;
            case "spock":
                return gesture.spock;
            default:
                break
        }
    }
    function handleClick() {
        props.Click(props.gesture);
    }
    return (
        <>

            <div className={`gesture ${"gesture-" + props.gesture} ${props.className}`} onClick={handleClick}>
                {selectedGesture()}
            </div>

        </>
    )
}