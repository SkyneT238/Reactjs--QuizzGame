import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Input } from '@mui/material';
import { IDataProps as IProps } from '../App';
import { isValidName } from '../utils';
import { useNavigate } from 'react-router-dom';

interface IPlayer {
    playerData: IProps["playerData"];
    setPlayerData: React.Dispatch<React.SetStateAction<IProps["playerData"]>>;
}
function CreateGame({setPlayerData}: IPlayer) {
    const [playerName, setPlayerName] = useState<string[]>([]);
    const navigate = useNavigate();

    const onSetName = (index: number, newName: string): void => {
        setPlayerName(prevData => {
            const newData: string[] = [...prevData];
            newData[index] = newName;
            return newData;
        });
    };

    const onHandleClick = (): void => {
        let isValid: boolean = true;
        playerName.forEach(name => {
            if (!isValidName(name)) {
                isValid = false;
            }
        });

        if (!isValid || !playerName[0]) {
            window.alert("Wrong name");
            return;
        }
        const data: IPlayer["playerData"] = Array(2).fill({ name: "", answers: [], result: [], score: 0, time: 0 });

        const newList: IPlayer["playerData"] = data.map((player, i) => {
            return {
                ...player,
                name: playerName[i],
            };
        })

        setPlayerData(newList);
        navigate('/create-match');
    }
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className='w-[50%] h-[50%] flex flex-col items-center outline outline-2 outline-offset-2'>
                <div className=" w-full h-[25%] px-5 flex justify-between items-center">
                    <div className="text-[40px]  font-bold">create game</div>
                    <CloseIcon onClick={()=>{navigate('/')}} style={{ width: "50px", height: "50px"}}></CloseIcon>
                </div>
                <div className="w-[90%] border-t-2 border-black border-dashed"></div>
                <div className='h-[75%] flex flex-col justify-center items-center'>
                    <div className="flex mt-8 justify-between gap-5">
                        <div className='text-[30px]'>Player 1</div>
                        <Input value={playerName[0]} onChange={(e) => onSetName(0, e.target.value)} className="border-2 border-solid border-black px-2" placeholder='Name' style={{ fontFamily: 'inherit', fontSize: "20px" }} ></Input>
                    </div>
                    <div className="flex justify-between mt-8 gap-5">
                        <div className='text-[30px]'>Player 2</div>
                        <Input value={playerName[1]} onChange={(e) => onSetName(1, e.target.value)} className="border-2 border-solid border-black px-2" placeholder='Name' style={{ fontFamily: 'inherit', fontSize: "20px" }} ></Input>
                    </div>
                    <button onClick={onHandleClick} className="mt-12 w-[50%] h-[20%] mb-8 border-solid border-black border-2 text-[30px] hover:border-white hover:shadow-lg hover:text-white hover:bg-slate-900 ">Play game</button>
                </div>
            </div>
        </div>
    )
}

export default CreateGame