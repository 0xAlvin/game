"use client"
import styles from "./page.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [open, setOpen] = useState(true);
  const [mode, setMode] = useState("normal");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedMode = localStorage.getItem("mode");
      if (storedMode) {
        setMode(storedMode);
      }
    }
  }, [mode]);

  const handleMode = (selectedmode: string = "") => {
    if (selectedmode === ""){
      if (localStorage.getItem("mode")){
        return;
      }
      localStorage.setItem("mode", mode);
      return;
    }
    setMode(selectedmode);
    localStorage.setItem("mode", selectedmode);
    return;
  };

  const handleSidekick = () => {
    setOpen(!open);
  }

  return (
    <main className={`${styles.main} ${styles.main_screen}`}>
      <Image src={`/images/back.jpeg`} width={2000} height={2000} alt="hero" className={styles.backgroundImg} />
      <h1>Welcome</h1>
      <p>Lets Play</p>
      <div className={styles.select_mode}>
        <p>Select mode</p>
        <div className={styles.modes}>
          <div className={styles.current_mode} onClick={handleSidekick}>
            <p>{mode}</p>
            <Image src={`/images/arrow.png`} width={40} height={40} alt="mode" />
          </div>
          <div className={`${styles.modeoptions} ${open ? styles.modeoptionshidden : ""}`}>
            <button type="button" role="button" onClick={() => { handleMode("normal"); handleSidekick() }}>Normal</button>
            <button type="button" role="button" onClick={() => { handleMode("extra"); handleSidekick() }}>Extra</button>
          </div>
        </div>
      </div>
      <Link href={`${'/play/'+ mode}`} className={styles.startbtn} onClick={() => { handleMode(); }}>START</Link>
    </main>
  );
}