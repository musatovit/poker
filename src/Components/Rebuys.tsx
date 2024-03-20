import React from "react";

function Rebuys({rebuy, setRebuy, sumRebuy,setSumRebuy, setAllChips, isBuyIn = true}: any) {
    const plusRebuy = (sum: any) => {
        setRebuy((prev: any) => prev + 1)
        setSumRebuy((prev: any) => [...prev, sum])
        setAllChips((prev: any) => prev + sum)
    }
    const deleteRebuy = () => {
        if (rebuy > 0) {
            setRebuy((prev: any) => prev - 1)
            setAllChips((prev: any) => prev - sumRebuy[sumRebuy.length-1])
            setSumRebuy((prev: any) => prev.slice(0, -1))
        }
    }
    return (
        <>
            <span>Количество ребаев</span>
            <p className='nextBlindName'>{rebuy}</p>
            {isBuyIn
                ? (
                    <>
                        <button onClick={() => plusRebuy(50000)}>50</button>
                        <button onClick={() => plusRebuy(60000)}>60</button>
                        <button onClick={() => plusRebuy(70000)}>70</button>
                    </>
                )
                : (<>
                    <button onClick={() => plusRebuy(5000)}>5000</button>
                    <button onClick={() => plusRebuy(10000)}>10000</button>
                    <button onClick={() => plusRebuy(20000)}>20000</button>
                </>)
            }

            <button onClick={() => deleteRebuy()}>del</button>
        </>)
}

export default Rebuys;
