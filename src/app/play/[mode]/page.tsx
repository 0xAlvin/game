// "use client"

import styles from "../../page.module.css";
import Rules from "@/components/rules/RulesModal";
import "./gameview.css";
import Game from "../Game";


export default function Home({params}: {params: {mode: string}}) {

  return (
    <main className={styles.main}>
      <div className="game_view">

        <Game mode={params.mode} />

      </div>
      <Rules />
    </main>
  );
}