import React from "react"
import Question from "./Question";
import uuid from 'react-uuid';

export default function GamePage(){

    //Set state variable to hold array
    const [questions, setQuestions] = React.useState([])

    //Get array of questions
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
        .then(res => res.json())
        .then(data => setQuestions(data.results));
    },[])

    const renderQuestions = questions.map((question, index) => <Question key={uuid()} title={question.question} incorrect={question.incorrect_answers} correct={question.correct_answer}/>)
    
    return (
        <div className="questions">
            {renderQuestions}
        </div>
    )
}