import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import GamePage from './components/GamePage';
import uuid from 'react-uuid';

function App() {
  function changePage() {
    setCurrentPage((prevPage) => {
      if (prevPage === 'landingPage') {
        return 'gamePage';
      } else if (prevPage === 'gamePage') {
        return 'checkPage';
      }
    });
  }

  //Set state variable to hold array
  const [questions, setQuestions] = React.useState([]);

  function formatQuestions(questions) {
    return questions.map((question) => {
      const incorrectArray = question.incorrect_answers;
      incorrectArray.push(question.correct_answer);
      return {
        id: uuid(),
        question: question.question,
        answers: incorrectArray.map((answer, index) => {
          return {
            id: uuid(),
            answer: answer,
            correct: incorrectArray.length - 1 === index ? true : false,
            selected: false,
          };
        }),
      };
    });
  }

  function shuffleArray(questions) {
    const unshuffled = formatQuestions(questions);
    const shuffled = unshuffled.map((question) => {
      return {
        ...question,
        answers: question.answers.sort(() => {
          return Math.random() - 0.5;
        }),
      };
    });
    return shuffled;
  }

  const [playAgain, setPlayAgain] = React.useState(0);

  function playGameAgain() {
    setPlayAgain((prev) => prev + 1);
    setCurrentPage('gamePage');
    setCorrectAnswers({
      num_correct: 0,
      total_questions: 0,
    });
  }

  //Get array of questions
  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then((res) => res.json())
      .then((data) => shuffleArray(data.results))
      .then((output) => setQuestions(output));
  }, [playAgain]);

  function selectAnswer(event, questionID, answerID) {
    setQuestions((prev) =>
      prev.map((question) => {
        if (question.id === questionID) {
          return {
            ...question,
            answers: question.answers.map((answer) => {
              if (answer.id === answerID) {
                return { ...answer, selected: !answer.selected };
              } else {
                return { ...answer, selected: false };
              }
            }),
          };
        } else {
          return question;
        }
      })
    );
  }

  const [currentPage, setCurrentPage] = React.useState('landingPage');

  const [correctAnswers, setCorrectAnswers] = React.useState({
    num_correct: 0,
    total_questions: 0,
  });

  function gradeQuiz() {
    setCorrectAnswers((prev) => {
      return { ...prev, total_questions: questions.length };
    });
    questions.forEach((question) => {
      question.answers.forEach((answer) => {
        if (answer.correct && answer.selected) {
          setCorrectAnswers((prev) => {
            return {
              ...prev,
              num_correct: (prev.num_correct += 1),
            };
          });
        }
      });
    });
    changePage();
  }

  let displayPage;
  if (currentPage === 'landingPage') {
    displayPage = <LandingPage changePage={changePage} />;
  } else {
    displayPage = (
      <GamePage
        questions={questions}
        selectAnswer={selectAnswer}
        changePage={changePage}
        currentPage={currentPage}
        playGameAgain={playGameAgain}
        gradeQuiz={gradeQuiz}
        correctAnswers={correctAnswers}
      />
    );
  }

  return (
    <main>
      <img src="blob-a.png" alt="blob-a" className="blob-a"></img>
      {displayPage}
      <img src="blob-b.png" alt="blob-b" className="blob-b"></img>
    </main>
  );
}

export default App;
