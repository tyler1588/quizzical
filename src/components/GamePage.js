import React from 'react';
import Question from './Question';

export default function GamePage(props) {
  const questions = props.questions;
  const selectAnswer = props.selectAnswer;
  const currentPage = props.currentPage;

  const renderQuestions = questions.map((question) => {
    return (
      <Question
        key={question.id}
        id={question.id}
        title={question.question}
        answers={question.answers}
        selectAnswer={selectAnswer}
        currentPage={currentPage}
      />
    );
  });

  let gameButton;
  if (questions.length > 0) {
    if (currentPage === 'gamePage') {
      gameButton = (
        <button className="check-btn" onClick={props.gradeQuiz}>
          Check Answers
        </button>
      );
    } else {
      gameButton = (
        <button className="check-btn" onClick={props.playGameAgain}>
          Play Again
        </button>
      );
    }
  }

  return (
    <div className="gamePage">
      <div className="questions">
        {renderQuestions}
        <div className="controls">
          {props.currentPage === 'checkPage' && (
            <h1 className="score">
              {`You scored ${props.correctAnswers.num_correct} / ${props.correctAnswers.total_questions} correct answers.`}
            </h1>
          )}
          {gameButton}
        </div>
      </div>
    </div>
  );
}
