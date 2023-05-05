import React from 'react'
import { IDataRound as IRound } from './RoundGame';
interface IData {
  currenQues: string;
  setPlayerChoice: React.Dispatch<React.SetStateAction<IRound["playerChoice"]>>;
  playerChoice: IRound["playerChoice"];
}
function Choice({ playerChoice, setPlayerChoice, currenQues }: IData) {
  return (
    <div className={`w-[60%] h-[15%] border-solid border-2 rounded-[5px] flex flex-row px-5  items-center gap-5 ${playerChoice !== currenQues ? ' border-black hover:border-white hover:shadow-lg hover:text-white hover:bg-slate-900' : 'bg-gray-400 text-white'}`}
      onClick={()=>playerChoice===currenQues ?setPlayerChoice("Empty"):setPlayerChoice(currenQues)}
      >
      <div className='w-[20px] h-[20px] rounded-full border-2 border-inherit border-dotted'></div>
      <div className='text-[1.5em] truncate break-words'>{currenQues}</div>
    </div>
  )
}

export default Choice