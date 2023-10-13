import React from "react";

function Level({level, setLevel}: any) {
    return (
        <>
            <span>{'Уровень: '}</span>
            <span>{level}</span>
        <button onClick={()=> setLevel(level+1)}>+</button>
        <button onClick={()=> setLevel(level-1)}>-</button>
        </>)
}

export default Level;
