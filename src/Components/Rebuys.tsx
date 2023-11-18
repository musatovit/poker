import React from "react";

function Rebuys({rebuy, setRebuy,setSumRebuy, setAllChips}: any) {
    const plusRebuy = (sum: any) => {
        setRebuy((prev: any) => prev + 1)
        setSumRebuy((prev: any) => prev + sum)
        setAllChips((prev: any) => prev + sum)
    }
    return (
        <>
            <span>Количесво ребаев</span>
            <p className='nextBlindName'>{rebuy}</p>
            <button onClick={() => plusRebuy(40000)}>40</button>
            <button onClick={() => plusRebuy(50000)}>50</button>
            <button onClick={() => plusRebuy(60000)}>60</button>
        </>)
}

export default Rebuys;
