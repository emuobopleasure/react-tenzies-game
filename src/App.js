import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import './App.css';
import Die from './Die';

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")
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

  const rollDice = () => {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
          return die.isHeld ? 
              die :
              generateNewDie()
      }))
    } else {
        setTenzies(false)
        setDice(allNewDice())
    }
  }

  const holdDice = (id) => {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
          {...die, isHeld: !die.isHeld} :
          die
    }))
  }

  return (
    <main className="main bg-[#F5F5F5] h-[38rem] mx-auto my-auto max-w-[800px]  rounded-[5px] p-[20px] flex flex-col justify-around items-center">
      {tenzies && <ReactConfetti/>}
      <h1 className='title text-[40px] m-0'>
        Tenzies
      </h1>
      <p className='instructions font-[Inter] text-center font-normal mt-0'>
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className='dice-container grid grid-cols-5 gap-[20px] mb-[40px]'>
        {
          dice.map((die) => (
            <Die 
              key={die.id}
              value={die.value}
              isHeld={die.isHeld}
              holdDice={() => holdDice(die.id)}
            />
          ))
        }
      </div>
      <button 
      onClick={rollDice}
      className='roll-dice h-[50px] w-[150px] border-none rounded-[6px] bg-[#5035FF] text-white text-[1.2rem] font-[`Karla`] cursor-pointer active:shadow-[inset_5px_5px_10px_-3px_rgba(0,0,0,0.7)]'>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
