import React from "react"
import {nanoid} from "nanoid"
import Question from "./Question"


export default function Trivia(){
    const [questions, setQuestion] = React.useState([])
    const [selectedAnswers, setSelectedAnswers] = React.useState([])
    const [checker, setChecker] = React.useState(false)
    const [gameisOver, setGameisOver] = React.useState(false)
    const [trigger, setTrigger] = React.useState(0);
    const [correctAnswerCount, setCorrectAnswerCount ] = React.useState(0)
    
    
    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&category=17&difficulty=medium&type=multiple')
        .then(res => res.json())
        .then(data => {
            setQuestion(data.results)
            setQuestion(prevState => 
                prevState.map(question => {
                    return {
                        id: nanoid(),
                        question: question.question,
                        correct_answer: question.correct_answer,
                        incorrect_answers:question.incorrect_answers,
                    }
                })
            )
        })
    },[trigger])
    
    React.useEffect(() => {
        setSelectedAnswers(questions.map(question => {
            return ({
                id: question.id,
            option: ""
            })
        })) 
    }, [questions])
    
    function storeSelectedAnswer(optionSelected, id){
        setSelectedAnswers(prevState => prevState.map(option => {
            return (id === option.id? {
                ...option,
                option: optionSelected
            }: option) 
        }))
    }
    function checkAnswers(){
        if(gameisOver){
            setTimeout(() => {
                 setQuestion([])
                setTrigger(prevTrigger => prevTrigger + 1);
                setGameisOver(false)
                setChecker(false)
                setCorrectAnswerCount(0)
            }, 500)  
        }
    
        const selectedAnswersArray = selectedAnswers.map(answer => answer.option)
        questions.forEach(question => {
            console.log(selectedAnswersArray)
            if(selectedAnswersArray.includes(question.correct_answer) && !gameisOver){
               setCorrectAnswerCount(prevCount => prevCount +1)
                
            }
                
        })
        console.log(correctAnswerCount)
        setChecker(true)
        setGameisOver(true)
    }

    const questionsHtml = questions.map(question => {
        return (

             <Question
                key={question.id}
                id={question.id}
                storeSelectedAnswer={storeSelectedAnswer}
                question={question.question}
                correct_answer={question.correct_answer}
                incorrect_answer={question.incorrect_answers}
                checker={checker}
                gameIsOver={gameisOver}
                />
        )
    }
   )
    
    return (
        <div className="trivia">
            {questionsHtml}
            {checker && <h3>You scored {correctAnswerCount}/5 correct answers</h3>}
            <button onClick={checkAnswers} className="answer-checker" >{gameisOver?"Play Again":"Check Answers"}</button>
        </div>
       
    )
}