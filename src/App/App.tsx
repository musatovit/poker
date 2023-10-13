import React, {useEffect, useState} from 'react';
import useSound from 'use-sound';
// @ts-ignore
import sound from '../Components/sounds/sound1.mp3'
import './App.css';
import Level from "../Components/Level";
import Blinds from "../Components/Blinds";
import TimeBlinds from "../Components/TimeBlinds";
import RealTime from "../Components/RealTime";
import {formatSeconds} from "../Components/utils.js"



function App() {
    const [level, setLevel] = useState(1);
    const [players, setPlayers] = useState(0);
    const [blinds, setBlinds] = useState([
        {
            level: 1,
            sb: 100,
            bb: 200,
            time: 25
        }, {
            level: 2,
            sb: 200,
            bb: 400,
            time: 25
        },
        {
            level: 3,
            sb: 300,
            bb: 600,
            time: 25
        },
        {
            level: 4,
            sb: 400,
            bb: 800,
            time: 25
        },
        {
            level: 5,
            sb: 500,
            bb: 1000,
            time: 25
        },
        {
            level: 6,
            sb: 600,
            bb: 1200,
            time: 25
        },
        {
            level: 7,
            sb: 800,
            bb: 1600,
            time: 25
        },
        {
            level: 8,
            sb: 1000,
            bb: 2000,
            time: 25
        },
        {
            level: 9,
            sb: 1500,
            bb: 3000,
            time: 25
        },
        {
            level: 10,
            sb: 2000,
            bb: 4000,
            time: 25
        },
        {
            level: 11,
            sb: 2500,
            bb: 5000,
            time: 25
        },
        {
            level: 12,
            sb: 3000,
            bb: 6000,
            time: 25
        },
        {
            level: 13,
            sb: 4000,
            bb: 8000,
            time: 25
        },
        {
            level: 14,
            sb: 5000,
            bb: 10000,
            time: 25
        },
        {
            level: 15,
            sb: 6000,
            bb: 1200,
            time: 25
        },
        {
            level: 16,
            sb: 7000,
            bb: 14000,
            time: 25
        },
        {
            level: 17,
            sb: 8000,
            bb: 16000,
            time: 25
        },
        {
            level: 18,
            sb: 9000,
            bb: 10000,
            time: 25
        },
        {
            level: 19,
            sb: 10000,
            bb: 20000,
            time: 25
        },
    ]);
    const [actualBlinds, setActualBlinds] = useState(blinds[level - 1]);
    const [time, setTime] = useState(1500);
    const [isActive, setIsActive] = useState(false);
    const [play] = useSound(sound)
    const [fullTime, setFullTime] = useState(0)
    const [nextPause, setNextPause] = useState(90*60)


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
                    <p className='level'>
                        <Level level={level} setLevel={setLevel}/>
                    </p>
                    <p className='time'>
                        <TimeBlinds time={time} setTime={setTime} isActive={isActive} setIsActive={setIsActive}/>
                    </p>
                </div>
                <div className='thirdColumn'>
                    <div className='rowThirdColumn'>
                        Количесво ребаев
                    </div>
                    <div className='rowThirdColumn'>
                        Средний стек
                    </div>
                    <div className='rowThirdColumn'>
                        Общее количество
                    </div>
                </div>
            </div>
            <div className='secondRow'>
                <div className='columnsSecondRow'>
                    ИгрОков
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
