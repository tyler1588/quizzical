import React from "react"
import './App.css';
import LandingPage from './components/LandingPage';
import GamePage from "./components/GamePage";

function App() {

  function changePage(){
    setCurrentPage(<GamePage />)
  }

  const [currentPage, setCurrentPage] = React.useState(<LandingPage changePage={changePage}/>)
  
  return (
    <main>
      <img src="blob-a.png" alt="blob-a" className="blob-a"></img>
      {currentPage}
      <img src="blob-b.png" alt="blob-b" className="blob-b"></img>
    </main>
   
  );
}

export default App;
