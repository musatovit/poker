import React from "react";

function Level({level, setLevel, blinds}: any) {
    const plusLevel = () => {
        if (level < blinds.length) {
            setLevel(level+1)
        }
    }
    const minusLevel = () => {
        if (level > 1) {
            setLevel(level-1)
        }
    }
    return (
        <>
            <span>{'Уровень: '}</span>
            <span>{level}</span>
        <button onClick={()=> plusLevel()}>+</button>
        <button onClick={()=> minusLevel()}>-</button>
        </>)
}

export default Level;
