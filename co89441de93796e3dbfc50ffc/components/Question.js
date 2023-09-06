import React from "react"

export default function Question(props){
    
    
    const [questionObject, setQuestionObject] = React.useState(
        {
            question: props.question,
            selectedOption: "",
            correctAnswer: props.correct_answer,
            options: []
            
        }
    )
    console.log(props)
    console.log("rendered")
    const [options, setOptions] = React.useState([])
    React.useEffect(() => {
        let options = insertAtRandomPosition([...props.incorrect_answer], props.correct_answer)
        setQuestionObject(prev => {return {...prev, options: options}})
    },[])

function insertAtRandomPosition(array, item) {
    let position = Math.floor(Math.random() * (array.length + 1));
    array.splice(position, 0, item);
    return array;
}
 function checkerColorOption(option){
        if (props.checker){
            if(option === questionObject.correctAnswer){
                return "correct"
            } 
            else {
                if(questionObject.selectedOption === option){
                    return "incorrect"
                } else{
                    return "other-answer"
                }
            } 
        } else{
            if (questionObject.selectedOption == option){
            return "normal-selection"
        }
        else{
            return ""
        }
        }
        
    }
    
    function selectAnswer(option, id){
        if (!props.gameIsOver){
            props.storeSelectedAnswer(option, id)
            setQuestionObject(prevQuestion => {
                return ({...prevQuestion, 
            selectedOption: option })})
        }
        
    }
   
    const style = {
        backgroundColor: "#D6DBF5",
        border: "none"
    }
    const optiosnHtml = questionObject.options.map(option => {
        let className = checkerColorOption(option)
        return (<p 
    className={`normal ${className}`}
    onClick={() => selectAnswer(option, props.id)}>{option}</p>)
    }
    )
    
    return (
        <div className="question-container">
            <h2>{questionObject.question.replace(/&quot;/g, '"')}</h2>
            <div className="options-container">
                {optiosnHtml}
            </div>
        </div>
       
    )
}