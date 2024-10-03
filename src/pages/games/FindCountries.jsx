import WorldMap from '../../components/WorldMap'
import styles from '../../styles/findWorldCountry.module.scss'
import DragToScroll from '../../components/DragToScroll'
import MenuBar from '../../components/MenuBar'
import { useEffect, useState } from 'react'
import { allCountriesEN } from '../../components/countryLists/allCountriesEN'
import { allCountriesLT } from '../../components/countryLists/allCountriesLT'
import { allCountriesRU } from '../../components/countryLists/allCountriesRU'
import Modal from '../../components/Modal'
import Highscore from '../../components/Highscore'
import { useTranslation } from 'react-i18next'
import { Draggable } from '../../components/Draggable'

export default function FindCountries() {

  const { t } = useTranslation();

  const [playGame, setPlayGame] = useState(true);

  const storedLanguage = localStorage.getItem('language') || 'EN';
  const allCountries = storedLanguage === 'EN' ? allCountriesEN : storedLanguage === 'LT' ? allCountriesLT : allCountriesRU;
  const [countriesLeft, setCountriesLeft] = useState([...allCountries]);
  const [currentCountry, setCurrentCountry] = useState({});
  const [countriesGuessed, setCountriesGuessed] = useState([]);

  const [wasDragging, setWasDragging] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);

  const [menuBarColor, setMenuBarColor] = useState('');
  const [endingTime, setEndingTime] = useState(0);

  const [lowScore, setLowScore] = useState(false);


  const restart = _ => {
    setEndingTime(0);
    setCountriesLeft([...allCountries]);
    setCountriesGuessed([]);
    setLowScore(false);
    setPlayGame(true);
  }

  // to stop registering a click when mouse click is used for scrolling:
  const checkMouseDown = _ => {
    !mouseDown ? setMouseDown(true) : null;
  };
  const checkMouseUp = _ => {
    mouseDown ? setMouseDown(false) : null;
  };
  const checkDragging = _ => {
    mouseDown ? setWasDragging(true) : null;
  };

  const getNewCountry = _ => {
    const randomIndex = Math.floor(Math.random() * countriesLeft.length);
    setCurrentCountry({ code: countriesLeft[randomIndex].code, name: countriesLeft[randomIndex].name });
  };

  useEffect(() => {
    if (countriesLeft.length > 0) {
      getNewCountry();
    } else {
      setPlayGame(false);
    }
  }, [countriesLeft]);

  const handleClick = (e) => {
    if (wasDragging) {
      setWasDragging(false)
    } else {
      let parent = e.target.parentNode;
      let selectedId;

      //getting selected country from WorldMap:
      if (parent.tagName === 'svg') {
        selectedId = e.target.id;
      } else if (parent.parentNode.tagName === 'svg') {
        selectedId = parent.id;
      } else {
        selectedId = parent.parentNode.id;
      }

      //checking if the selected element is a country and is not in the countriesGuessed list:
      const selectedCountry = allCountries.find((row) => row.code === selectedId);
      if (!!selectedCountry && !countriesGuessed.includes(selectedCountry)) {
        // if the guess is correct:
        if (currentCountry.code === selectedCountry.code) {
          setMenuBarColor(styles.green);
          setCountriesGuessed(items => [...items, selectedCountry]);
          setTimeout(() => {
            setMenuBarColor('');
          }, "400");
        } else {
          setMenuBarColor(styles.red);
          setTimeout(() => {
            setMenuBarColor('');
          }, "400");
        }

        //removing used country from countriesLeft array:
        setCountriesLeft(prevCountriesLeft => prevCountriesLeft.filter(item => item.code !== currentCountry.code));
      }
    }
  };

  return (

    <div style={{
      overflow: "visible",
      position: "relative",
      height: "100%",
      width: "100%",
      backgroundColor: "#04020f"
    }}>
      {!playGame && (
        <Modal>
          <div className={styles.upperCont}>
            <h1>{t('done')}</h1>
          </div>
          <Highscore playGame={playGame} score={countriesGuessed.length} allCountries={allCountries.length} endingTime={endingTime} lowScore={lowScore} setLowScore={setLowScore} />
          <div className={styles.lowerCont}>
            <button className="btn" onClick={restart}>{t('tryAgain')}</button>
          </div>

        </Modal>
      )}
      {/* {playGame && <DragToScroll />} */}
      {playGame && <MenuBar menuBarColor={menuBarColor} playGame={playGame} setPlayGame={setPlayGame} country={currentCountry.name} score={`${countriesGuessed.length}/${allCountries.length}`} setEndingTime={setEndingTime} />}
      <Draggable
        initialPos={{ x: 0, y: 0 }}
        fixOnAxis='none'
      >
        <WorldMap styles={styles} onElementClick={handleClick} checkMouseDown={checkMouseDown} checkMouseUp={checkMouseUp} checkDragging={checkDragging} countriesGuessed={countriesGuessed} />
      </Draggable>
    </div>

  )
}