import React from 'react';

export default function Question(props) {
  function htmlDecode(input) {
    const parser = new DOMParser().parseFromString(input, 'text/html');

    return parser.documentElement.textContent;
  }
  const title = htmlDecode(props.title);

  const questionID = props.id;

  return (
    <div className="question">
      <h1 className="question-title">{title}</h1>
      <div className="answers">
        {props.answers.map((element) => {
          const parsedElement = htmlDecode(element.answer);

          let format;
          if (props.currentPage === 'gamePage') {
            if (element.selected) {
              format = 'selected-btn';
            } else {
              format = 'question-btn';
            }
          } else {
            if (element.correct) {
              format = 'correct-btn';
            } else if (element.selected && !element.correct) {
              format = 'incorrect-btn';
            } else {
              format = 'question-btn';
            }
          }

          return (
            <button
              key={element.id}
              className={format}
              onClick={
                props.currentPage === 'gamePage'
                  ? (event) => props.selectAnswer(event, questionID, element.id)
                  : ''
              }
            >
              {parsedElement}
            </button>
          );
        })}
      </div>
    </div>
  );
}
