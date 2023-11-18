import React from "react";

function Players({players, setPlayers}: any) {
    const plusPlayer = () => {
        if (players.all > players.inGame) {
            setPlayers((prev: any) => ({...prev, inGame: prev.inGame + 1}))
        }
    }
    const minusPlayer = () => {
        if (1 < players.inGame) {
            setPlayers((prev: any) => ({...prev, inGame: prev.inGame - 1}))
        }
    }
    const plusAllPlayer = () => {
        setPlayers((prev: any) => ({...prev, inGame: prev.inGame + 1, all: prev.all + 1}))
    }
    const minusAllPlayer = () => {
        if (players.inGame > 1){
            setPlayers((prev: any) => ({...prev, inGame: prev.inGame - 1, all: prev.all - 1}))
        }
    }
    return <>
        <p>Игроков</p>
        <p className="blind"><span>{players.inGame}</span><span>/</span><span>{players.all}</span></p>
        <button onClick={() => plusPlayer()}>+</button>
        <button onClick={() => minusPlayer()}>-</button>
        <span>{'  '}</span>
        <button onClick={() => plusAllPlayer()}>+</button>
        <button onClick={() => minusAllPlayer()}>-</button>
    </>
}

export default Players
