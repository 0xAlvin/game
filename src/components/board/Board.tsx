import "./board.css";
import Image from "next/image";


export default function Board(props: { score:number, mode: string }) {


  return (
    <div className="board">
      <div className="game-name">
        <Image
          src={props.mode !== "extra" ? "/images/logo.svg" : "/images/logo-bonus.svg"}
          alt="logo"
          width={150}
          height={100}
          className="logo-image"
          priority
        />
      </div>
      <div className="scoreboard">
        <p>SCORE</p>
        <p>{props.score}</p>
      </div>
    </div>
  );
}