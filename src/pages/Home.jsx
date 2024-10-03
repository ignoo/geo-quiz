import { useNavigate } from 'react-router-dom';
import Star from '../assets/star.svg';
import Globe from '../assets/globe.svg';
import Sun from '../assets/sun.svg';
import Ufo from '../assets/ufo.svg';
import styles from '../styles/home.module.scss';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import i18n from '../utils/i18n/index';
import ltflag from '../assets/ltflag.png';
import ukflag from '../assets/ukflag.png';
import ruflag from '../assets/ruflag.png';

export default function Home() {

    const { t, i18n } = useTranslation();

    const navigate = useNavigate();
    const [sunTransition, setSunTransition] = useState('');

    const languageVariants = [
        { language: 'LT', flag: ltflag },
        { language: 'RU', flag: ruflag },
        { language: 'EN', flag: ukflag }
    ];
    const [selectedLng, setSelectedLng] = useState(_ => {
        const storedLanguage = localStorage.getItem('language') || 'EN';
        return languageVariants.find(lng => lng.language === storedLanguage);
    });
    const [otherLngs, setOtherLngs] = useState(_ => {
        const storedLanguage = localStorage.getItem('language') || 'EN';
        return languageVariants.filter(lng => lng.language !== storedLanguage);
    });
    const [openLngSelector, setOpenLngSelector] = useState(false);

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

    const handleLngSelect = (lang) => {
        const leftLng = otherLngs.filter(lng => lng.language != lang.language);
        setOtherLngs([leftLng[0], selectedLng]);
        setSelectedLng(lang);
        setOpenLngSelector(false);
        i18n.changeLanguage(lang.language);
        localStorage.setItem('language', lang.language);


    };

    const stars = useMemo(_ => (
        Array(80).fill(1).map((item, index) => (
            <div key={index} className={styles.starContainer} style={{ top: `${randomNumber(0, 99)}%`, left: `${randomNumber(0, 99)}%` }}>
                <Star className={styles.star} style={{ height: `${randomNumber(10, 20)}px`, animationDelay: `${randomNumber(0, 800)}ms` }} />
            </div>
        ))
    ), [])

    return (
        <>

            <div className={styles.background}>
                <div className={styles.globeContainer}><Globe className={styles.globe} /></div>
                <div className={styles.startContainer}>
                    <button className={`${styles.startBtn} ${styles[sunTransition]}`} onClick={handleClick}>{t('startBtn')}</button>
                </div>
                {stars}
                <div className={styles.ufoContainer}>
                    <Ufo className={styles.ufo} />
                    <div className={styles.langsContainer}>
                        <button className={`btn ${styles.lngSelector}`} onClick={openLngSelector ? _ => setOpenLngSelector(false) : _ => setOpenLngSelector(true)}>{selectedLng.language}<img className={styles.flag} src={selectedLng.flag} /></button>
                        <ul className={`${styles.list} ${openLngSelector ? styles.open : styles.close}`}>
                            {otherLngs.map((lng) => (
                                <li key={uuidv4()} className={styles.lng} onClick={_ => handleLngSelect(lng)}>{lng.language}<img className={styles.flag} src={lng.flag} /></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={`${styles.sunContainer} ${styles[sunTransition]}`}>
                    <Sun className={styles.sun} />
                </div>
            </div>

        </>
    )
}

