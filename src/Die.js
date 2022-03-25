import React from 'react'

const Die = ({value, isHeld, holdDice}) => {
  return (
    <div 
    onClick={holdDice}
    className={isHeld ? 'die-face h-[50px] w-[50px] shadow-[0px_2px_2px_rgba(0,0,0,0.15)] rounded-[10px] flex justify-center items-center cursor-pointer bg-[#59E391]'
    :
    'die-face h-[50px] w-[50px] shadow-[0px_2px_2px_rgba(0,0,0,0.15)] rounded-[10px] flex justify-center items-center cursor-pointer bg-white'}>
        <h2 className='die-num text-[2rem]'>
            {value}
        </h2>
    </div>
  )
}

export default Die