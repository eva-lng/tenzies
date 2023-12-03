import { useState, useEffect } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import {useWindowSize} from 'react-use';

export default function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [numOfRolls, setNumOfRolls] = useState(0)
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [bestTime, setBestTime] = useState(0)
  const { width, height } = useWindowSize()

  useEffect(() => {
    const firstValue = dice[0].value
    const someHeld = dice.some(die => die.isHeld)
    if (someHeld) {
      setRunning(true)
    }
    if (dice.every(die => die.isHeld && die.value === firstValue)) {
      setRunning(false)
      setTenzies(true)
      let currentTime = time
      if (currentTime < bestTime) {
        setBestTime(currentTime)
        localStorage.setItem("bestTime", JSON.stringify(currentTime))
      }
    }
  }, [dice, time, bestTime])

  useEffect(() => {
    let interval
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10)
    } else if (!running) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [running])

  useEffect(() => {
    const bestTime = JSON.parse(localStorage.getItem("bestTime"))
    if (bestTime) {
      setBestTime(bestTime)
    }
  }, [])
  
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice() {
    if (tenzies) {
      setDice(allNewDice())
      setNumOfRolls(0)
      setTime(0)
      setTenzies(false)
    } else {
      if (!running) {
        setRunning(true)
      }
      setDice(prevDice => prevDice.map(die => (
        die.isHeld ? die : generateNewDie()
      )))
      setNumOfRolls(prevNum => prevNum + 1)
    }
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => (
      die.id === id ? {...die, isHeld: !die.isHeld} : die
    )))    
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))
  
  return (
    <main>
      {tenzies && <Confetti width={width} height={height} />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="stats-container">
        <div className="rolls">
          <p>Rolls: {numOfRolls}</p>
        </div>
        <div className="currentTime">
          <span>Time: </span>
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>
        <div className="bestTime">
          <span>Best: </span>
          <span>
			    	{("0" + Math.floor((bestTime / 60000) % 60)).slice(-2)}:
			    </span>
			    <span>
			    	{("0" + Math.floor((bestTime / 1000) % 60)).slice(-2)}:
			    </span>
			    <span>
			    	{("0" + ((bestTime / 10) % 100)).slice(-2)}
			    </span>
        </div>
      </div>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}
