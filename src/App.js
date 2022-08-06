import React from "react"
import './App.css';
import LandingPage from './components/LandingPage';
import GamePage from "./components/GamePage";

function App() {

  function changePage(){
    setCurrentPage('gamePage')
  }
  
  const [currentPage, setCurrentPage] = React.useState('landingPage')

  const displayPage = currentPage === 'landingPage' ? <LandingPage changePage={changePage}/> : <GamePage />

  return (
    <main>
      <img src="blob-a.png" alt="blob-a" className="blob-a"></img>
      {displayPage}
      <img src="blob-b.png" alt="blob-b" className="blob-b"></img>
    </main>
   
  );
}

export default App;
