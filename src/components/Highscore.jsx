import { useEffect, useState } from "react";
import styles from '../styles/highscores.module.scss';

export default function Highscores({ playGame, score, allCountries, endingTime, lowScore, setLowScore }) {

    const [highscores, setHighscores] = useState([]);

    const convertToTimeString = (totalSeconds) => {
        const min = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const sec = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };

    const isScoreTooLow = (result, highscores) => {
        return result.score < highscores[highscores.length - 1].score;
    };

    const isTimeTooSlow = (result, highscores) => {
        return result.score === highscores[highscores.length - 1].score &&
        result.time > highscores[highscores.length - 1].time;
    };

    useEffect(_ => {
        if (!playGame) {

            const currentDate = new Date();
            const formattedDate = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`;
            const result = { id: Math.round(currentDate.getTime() / 10), score: score, time: endingTime, date: formattedDate, new: 'true' }
            let savedHighscores = JSON.parse(localStorage.getItem('highscore')) || [];

            const isDuplicate = savedHighscores.some(entry => entry.id === result.id)

            if (!isDuplicate) {
                if (savedHighscores.length > 9 && (isScoreTooLow(result, savedHighscores) || isTimeTooSlow(result, savedHighscores))) {
                    console.log('too low');
                    setLowScore(result);
                    setHighscores([...savedHighscores]);
                } else {
                    if (savedHighscores.length > 9){
                        savedHighscores.pop();
                        console.log('popped');
                    }
                    console.log('after pop');
                    const updatedHighscores = savedHighscores ? [...savedHighscores, result] : [result];
                    updatedHighscores.sort((a, b) => b.score - a.score || a.time - b.time)
                    localStorage.setItem('highscore', JSON.stringify(updatedHighscores.map(({ new: _, ...withoutNew }) => withoutNew)));
                    setHighscores(updatedHighscores); 
                }
            }
        }
    }, [playGame])


    return (

        <table className={styles.table}>
            <caption className={styles.header}>Your best results</caption>
            <tbody>
                {highscores?.map((row, i) => (

                    row.new ? (
                        <tr className={styles.newHighScore} key={i}>
                            <td>{i + 1}</td>
                            <td>{row.date}</td>
                            <td>{row.score}/{allCountries}</td>
                            <td>{convertToTimeString(row.time)}</td>
                        </tr>
                    ) : (
                        <tr className={styles.oldScores} key={i}>
                            <td>{i + 1}</td>
                            <td>{row.date}</td>
                            <td>{row.score}/{allCountries}</td>
                            <td>{convertToTimeString(row.time)}</td>
                        </tr>
                    )

                ))}
                {lowScore && (
                    <tr className={styles.newLowScore}>
                        <td></td>
                        <td>{lowScore.date}</td>
                        <td>{lowScore.score}/{allCountries}</td>
                        <td>{convertToTimeString(lowScore.time)}</td>
                    </tr>
                )}
            </tbody>
        </table>

    );
};
