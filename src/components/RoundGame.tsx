import { useEffect, useState } from 'react'
import Choice from './Choice';
import { IDataProps as IProps } from '../App';
export interface IDataRound {
    player: {
        name: string;
        answers: string[];
        result: string[];
        score: number;
        time: number;
    };
    round: number;
    time: IProps["levelTime"];
    playerChoice: string;
    quests: string[];
    turn: number;
    onHandleSubmit: (value: string, turn: number,totalTime:number) => void;


}
function RoundGame({ turn, time, round, player, quests, onHandleSubmit }: IDataRound) {

    const [playerChoice, setPlayerChoice] = useState<IDataRound["playerChoice"]>("Empty");
    const [remainingTime, setRemainingTime] = useState<IDataRound["time"]>(time);

    const timer = (): void => {
        setRemainingTime((prevTime) => prevTime - 1);
    };

    const renderChoices = () => {
        const choicesProps = { playerChoice, setPlayerChoice };
        return quests.slice(1).map((quest) => {
          return <Choice {...choicesProps} currenQues={quest} />;
        });
      };

    useEffect(() => {
        const interval = setInterval(timer, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (remainingTime == 0) onHandleSubmit(playerChoice, turn,10);
    }, [remainingTime])

    return (
        <div className='w-[50%] h-[50%] flex flex-col items-center justify-center outline outline-2 outline-offset-2 min-w-[300px] min-h-[500px] '>
            <div className='w-[100%] h-[20%] px-10 flex felx-row justify-between items-center' >
                <div className='text-[20px] w-[40%] hidden md:block text-left'>{3 - round} question left</div>
                <div className='w-[20%] flex flex-col items-center'>
                    <div className='text-[2em] min-w-[300px] hidden md:block font-extrabold text-center'>Round {round}</div>
                    <div className='text-[25px]'>{player.name} turn</div>
                </div>
                <div className='w-[40%] flex justify-end items-center gap-5' >
                    <div className='text-[20px] hidden md:block '>Time remindning</div>
                    <input className={`w-[50px] h-[50px] text-[20px] font-bold border-2 border-black ${remainingTime>5?"text-black":"text-red-600"} rounded-full`}type='button' value={remainingTime}></input>
                </div>
            </div>
            <div className='w-[90%] border-t-2 border-dashed border-black'></div>
            <div className='w-[100%] h-[70%] flex flex-col justify-start items-center py-2'>
                <div className='w-[80%] h-[20%] flex items-center justify-center pb-2 pt-3'>
                    <div className='text-[1.4em] font-bold  text-justify '>{quests[0]}</div>
                </div>
                <div className='w-[100%] h-[80%] flex flex-col gap-[25px] justify-center items-center '>
                    {renderChoices()}
                </div>
            </div>
            <button onClick={() => { onHandleSubmit(playerChoice, turn,time-remainingTime) }} className='w-[30%] h-[10%] text-[20px] text-black border-2 border-black my-[5px] hover:border-white hover:shadow-lg hover:text-white hover:bg-slate-900'>Submit</button>
        </div>
    )
}

export default RoundGame