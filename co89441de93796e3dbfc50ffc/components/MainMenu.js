import React from "react"

export default function MainMenu({startGame}){
    return (
        <div className="main-menu">
            <h1>React Trivia</h1>
            <p>Best Trivia Game ever</p>
            <button className="start-game-btn" onClick={startGame}> Start Quiz </button>
        </div>
       
    )
}