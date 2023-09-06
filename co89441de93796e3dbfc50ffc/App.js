import React from "react"
import MainMenu from "./components/MainMenu"
import Trivia from "./components/Trivia"

export default function App(){
    const [isInMainMenu, setIsInMainMenu] = React.useState(true)
    
    function startGame(){
        setIsInMainMenu(false)
    }
    return (
        
         isInMainMenu? <MainMenu startGame={startGame} />: <Trivia />
    )
}