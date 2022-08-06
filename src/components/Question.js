import React from "react"
import uuid from 'react-uuid';

export default function Question(props){

    const questionArray = props.incorrect
    questionArray.push(props.correct)

    const objectArray = questionArray.map(question => {
        return (
            {
                title: question,
                selected: false,
                id: uuid()
            }
        )    
    })

    const [outputArray, setOutputArray] = React.useState(objectArray)

    function selectAnswer(event, id){
        setOutputArray(prev => prev.map(question => {
            return (
                question.id === id ? {...question, selected: !question.selected} : question
            )
        })
        )
    }


    function htmlDecode(input){
        const parser = new DOMParser().parseFromString(input, "text/html")

        return parser.documentElement.textContent;
    }
    const title = htmlDecode(props.title)

    return (
        <div className="question">
            <h1 className="question-title">{title}</h1>
            <div className="answers">
                {outputArray.map(element => {
                    const parsedElement = htmlDecode(element.title)
                    return (
                        <button 
                        key={element.id} 
                        className="question-btn"
                        onClick={(event) => selectAnswer(event, element.id)}
                        style={{
                            backgroundColor: element.selected ? "#D6DBF5" : "transparent"
                        }}>{parsedElement}</button>
                    )
            })}
            </div>
        </div>
    )
}