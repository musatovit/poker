import React, {useEffect, useState} from 'react';
import useSound from 'use-sound';
// @ts-ignore
import sound from '../sounds/next.mp3'
// @ts-ignore
import pause from '../sounds/pause.mp3'
import './App.css';
import Level from "../Components/Level";
import Blinds from "../Components/Blinds";
import TimeBlinds from "../Components/TimeBlinds";
import RealTime from "../Components/RealTime";
import {formatSeconds} from "../Components/utils.js"
import {getStrukture} from "./strukture"
import Players from "../Components/Players";
import Rebuys from "../Components/Rebuys";



function App() {
    const [level, setLevel] = useState(1);
    const [players, setPlayers] = useState({inGame: 10, all: 10});
    const [strukture, setStrukture] = useState(0)
    const [blinds, setBlinds] = useState(getStrukture()[strukture]);
    const [actualBlinds, setActualBlinds] = useState(blinds[level - 1]);
    const [time, setTime] = useState(1500);
    const [isActive, setIsActive] = useState(false);
    const [play] = useSound(sound)
    const [playPause] = useSound(pause)
    const [fullTime, setFullTime] = useState(0)
    const [nextPause, setNextPause] = useState(90*60)
    const [rebuy, setRebuy] = useState(0)
    const [sumRebuy, setSumRebuy] = useState(0)
    const [allChips, setAllChips] = useState(40000*players.all)

    useEffect(() => {
        setAllChips(40000*players.all+sumRebuy)
    }, [players]);


    useEffect(() => {
        const blind = blinds.find(el => el.level === level)
        // @ts-ignore
        setActualBlinds(() => {
            return blind
        })
        play()
        // @ts-ignore
        setTime(blind.time*60)
    }, [level])

    useEffect(() => {
        if (nextPause === 0) {
            playPause()
            setIsActive(!isActive)
            setNextPause(90*60)
        }
    }, [nextPause]);


    const levelUp = () => setLevel(level => level +1)

    useEffect(() => {
        if (time > 0 && isActive) {
            const timerId = setTimeout(() => {
                setTime(time - 1);
                setFullTime(fullTime+1)
                setNextPause(nextPause-1)
            }, 1000);
            return () => clearTimeout(timerId);
        } else if (time === 0) {
            levelUp()
        }
    }, [time, isActive]);

    const changeTournament = () => {
        if (getStrukture().length-1 === strukture) {
            setStrukture(0)
        } else {
            setStrukture(strukture + 1)
        }
    }

    useEffect(() => {
        setBlinds(getStrukture()[strukture])
        setLevel(1)
        setActualBlinds(getStrukture()[strukture][level - 1])
        setTime(getStrukture()[strukture][level - 1].time*60)
    }, [strukture]);


    return (
        <div className='desk'>
            <div className='firstRow'>
                <div className='firstColumn'>
                    <div className='rowFirstColumn'>
                        <RealTime />
                    </div>
                    <div className='rowFirstColumnSecond'>
                       <p className='textCol'>Общая продолжительность</p>
                        <p className='fullTime'>{formatSeconds(fullTime)}</p>
                    </div>
                    <div className='rowFirstColumnThird'>
                       <p className='textCol'>Следующий перерыв через</p>
                        <p className='ddd'>{formatSeconds(nextPause)}</p>
                        <button onClick={()=>setNextPause(90*60)}>Cброс</button>
                    </div>
                </div>
                <div className='secondColumn'>
                    <p onClick={()=> changeTournament()}>{blinds[0]?.name}</p>
                    <p className='level'>
                        <Level level={level} setLevel={setLevel} blinds={blinds}/>
                    </p>
                    <p className='time'>
                        <TimeBlinds time={time} setTime={setTime} isActive={isActive} setIsActive={setIsActive}/>
                    </p>
                </div>
                <div className='thirdColumn'>
                    <div className='rowThirdColumn'>
                        <Rebuys rebuy={rebuy} setRebuy={setRebuy} setSumRebuy={setSumRebuy} setAllChips={setAllChips}/>
                    </div>
                    <div className='rowThirdColumn'>
                        Средний стек
                        <p className='nextBlindName'>{Math.ceil(allChips/players.inGame)}</p>
                    </div>
                    <div className='rowThirdColumn'>
                        Сумма фишек
                        <p className='nextBlindName'>{allChips}</p>
                    </div>
                </div>
            </div>
            <div className='secondRow'>
                <div className='columnsSecondRow'>
                    <Players players={players} setPlayers={setPlayers}/>
                </div>
                <div className='columnsSecondRow'>
                    <p className='blindName'>Блайнды</p>
                    <p className='blind'><Blinds actualBlinds={actualBlinds}/></p>
                </div>
                <div className='columnsSecondRow'>
                    <>
                        <p className='nextBlindName'>Следующие блайнды</p>
                        <p className='nextBlind'>
                            {blinds.find((el) => el.level === level + 1)?.sb} /
                            {' '}
                            {blinds.find((el) => el.level === level + 1)?.bb}
                        </p>
                    </>
                </div>
            </div>
        </div>
    )
}

export default App;
