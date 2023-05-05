import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainMenu from './pages/MainMenu'
import CreateGame from './pages/CreateGame'
import PlayGame from './pages/PlayGame'
import CreateMatch from './components/CreateMatch'
import Summary from './pages/Summary'

export interface IDataProps {
  playerData: {
    name: string;
    answers: string[];
    result: string[];
    score: number;
    time: number;
  }[];

  levelTime: number;
  round: number;
  match: number;
  currentMatch: number;
}


function App() {
  const [playerData, setPlayerData] = useState<IDataProps["playerData"]>(JSON.parse(`${localStorage.getItem("playerData")}`) || []);
  const round: IDataProps["round"] = (3);
  const time: IDataProps["levelTime"] = 10;
  const [match, setMatch] = useState<IDataProps["match"]>(1);
  const [currentMatch, setCurrentMatch] = useState<IDataProps["currentMatch"]>(1);

  const onHandleSetMatch = (value: number): void => {

    if (value > 0) setMatch(match + 1);
    else if (match == 1) return; else setMatch(match - 1);

  }

  const setNextMatch = (resetList: IDataProps["playerData"], newMatch: number): void => {
      setCurrentMatch(newMatch);
      setPlayerData(resetList);
  }
  useEffect(() => {
    if (!playerData) return;
    localStorage.setItem("playerData", JSON.stringify(playerData));
  }, [playerData])

  return (
    <Routes>
      <Route path='/' element={<MainMenu></MainMenu>}></Route>
      <Route
        path='/create'
        element={
          <CreateGame
            playerData={playerData}
            setPlayerData={setPlayerData}
          ></CreateGame>}>
      </Route>
      <Route
        path='/create-match'
        element={
          <CreateMatch
            onHandleSetMatch={onHandleSetMatch}
            match={match}
          ></CreateMatch>
        }
      >

      </Route>
      <Route
        path='/play-game'
        element={
          <PlayGame
            round={round}
            time={time}
            playerList={playerData}
            match={currentMatch}
            setPlayerData={setPlayerData}
          ></PlayGame>}>

      </Route>

      <Route
        path='/summary'
        element={
          <Summary playerList={playerData} setPlayerList={setPlayerData} match={match} currentMatch={currentMatch} setNextMatch={setNextMatch}></Summary>}>
      </Route>

    </Routes>
  )
}

export default App
