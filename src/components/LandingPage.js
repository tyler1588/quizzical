import React from "react"

export default function LandingPage(props){
    return (
        <div>
            <h1 className="title">Quizzical</h1>
            <p className="sub-title">A fun brain game.</p>
            <button className="start-btn" onClick={props.changePage}>Start quiz</button>
        </div>
    )
}