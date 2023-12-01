import { useState, useEffect } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"
import {useWindowSize} from 'react-use';

export default function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [numOfRolls, setNumOfRolls] = useState(0)
  const { width, height } = useWindowSize()

  useEffect(() => {
    const firstValue = dice[0].value
    if (dice.every(die => die.isHeld && die.value === firstValue)) {
      setTenzies(true)
    }
  }, [dice])
  
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
      setTenzies(false)
    } else {
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
          <p>Number of rolls: {numOfRolls}</p>
        </div>
      </div>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}
