import React from "react";

function TimeBlinds({time, setTime, isActive, setIsActive}: any) {


    return <>
        <>
            {Math.floor(time / 60)}:{time % 60 <= 9 ? '0' + time % 60 : time % 60}
        </>
        {!isActive && <button onClick={() => setIsActive(!isActive)}>Start</button>}
        {isActive && <button onClick={() => setIsActive(!isActive)}>Pause</button>}
        <button onClick={() => setTime((prev: number) => prev + 60)}>+</button>
        <button onClick={() => setTime((prev: number) => prev - 60)}>-</button>
    </>
}

export default TimeBlinds

