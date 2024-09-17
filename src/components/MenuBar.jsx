import { useEffect, useState } from 'react';
import styles from '../styles/menuBar.module.scss';

export default function MenuBar({ menuBarColor, playGame, setPlayGame, country, score, setEndingTime }) {

  const [minutesPassed, setMinutesPassed] = useState(0);
  const [secondsPassed, setSecondsPassed] = useState(0);

  const timeFormatter = (min, sec) => {
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const onStop = _ => {
    setEndingTime(minutesPassed*60 + secondsPassed);
    setPlayGame(false);
  }

  //stopwatch:
  useEffect(_ => {
    let interval;
    if (playGame) {
      interval = setInterval(_ => {
        if (secondsPassed < 59) {
          setSecondsPassed(sec => sec + 1);
        } else {
          setSecondsPassed(0);
          setMinutesPassed(min => min + 1);
        }
      }, 1000)
    } else {
      onStop();
    }
    return () => clearInterval(interval);
  }, [secondsPassed, minutesPassed, playGame]); 


  return (

    <header className={`${styles.bar} ${menuBarColor}`}>
      <div className={styles.flag} ></div>
      <h1 className={styles.countryName}>{country}</h1>
      <div className={styles.infoCont}>
        <div className={styles.info}>
          <div className={styles.timePassed}>{timeFormatter(minutesPassed, secondsPassed)}</div>
          <div className={styles.guessed}>{score}</div>
        </div>
        <button className="btn" onClick={onStop}>GIVE UP</button>
      </div>     
    </header>

  )
};
