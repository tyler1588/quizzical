import React from "react"
import uuid from 'react-uuid'

export default function Question(props){

    const questionArray = props.incorrect
    questionArray.push(props.correct)

    return (
        <div className="question">
            <h1 className="question-title">{props.title}</h1>
            <div className="answers">
                {questionArray.map(element => {
                    return (
                        <button key={uuid()} className="question-btn">{element}</button>
                    )
            })}
            </div>
        </div>
    )
}