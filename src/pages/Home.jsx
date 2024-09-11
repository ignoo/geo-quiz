import { Link, useNavigate } from 'react-router-dom'
import Star from '../assets/star.svg'
import Globe from '../assets/globe.svg'
import Sun from '../assets/sun.svg'
import Ufo from '../assets/ufo.svg'
import styles from '../styles/home.module.scss'
import { useState } from 'react'

export default function Home() {

    const navigate = useNavigate();
    const [sunTransition, setSunTransition] = useState('')

    const randomNumber = (min, max) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };

    const handleClick = () => {
        setSunTransition('start')
        setTimeout(() => {
            navigate("/find-countries")
        }, 1200);
    };

    return (
        <>
            <div className={styles.background}>

                <div className={styles.globeContainer}><Globe className={styles.globe}/></div>

                <div className={styles.startContainer}>
                    <button className={`${styles.startBtn} ${styles[sunTransition]}`} onClick={handleClick}>START</button>
                </div>
                {Array(80).fill(1).map((item, index) => (
                    <div key={index} className={styles.starContainer} style={{ top: `${randomNumber(0, 99)}%`, left: `${randomNumber(0, 99)}%` }}>
                        <Star className={styles.star} style={{ height: `${randomNumber(10, 20)}px`, animationDelay: `${randomNumber(0, 800)}ms` }}/>
                    </div>
                ))}
                <div className={styles.ufoContainer}><Ufo className={styles.ufo}/></div>
                <div className={`${styles.sunContainer} ${styles[sunTransition]}`}>
                    <Sun className={styles.sun}/>
                </div>
            </div>

        </>
    )
}

