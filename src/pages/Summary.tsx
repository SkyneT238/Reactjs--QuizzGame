import { useEffect, useState } from "react";
import { IDataProps } from "../App";
import { useNavigate } from "react-router-dom";
interface IplayerList {
    playerList: IDataProps["playerData"];
    setPlayerList: React.Dispatch<React.SetStateAction<IDataProps["playerData"]>>;
    setNextMatch: (playerList:IDataProps["playerData"], newMatch : number) => void;
    match: IDataProps["match"];
    currentMatch: IDataProps["currentMatch"];
}
export default function Summary({ playerList, setPlayerList, setNextMatch, match, currentMatch }: IplayerList) {

    const resetRound:IDataProps["round"] = 1;

    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');

    const onHandleNextMatch  = ():void  =>
    {
        const newPlayers = playerList.map(player => Object.assign({}, player, { answers: "", result: "",sorce:0,time:0}));
        localStorage.setItem("round",JSON.stringify(resetRound));
        setNextMatch(newPlayers,currentMatch+1);
        navigate('/play-game');
    }
    const handleSearch = (value: string): void => {
        setSearchText(value);
    };

    const findWinner = (): string => {

        let winner = "";
        let highestScore = 0;
        let isDraw = false;

        playerList.forEach((player) => {
            if (player.score > highestScore) {
                highestScore = player.score;
                isDraw = false;
                winner = player.name;
            } else if (player.score === highestScore) {
                isDraw = true;
            }
        })
        return isDraw ? "The match is drawn" : "The winner is " + winner;
    };

    const onHandleNewGame = (): void => {
        localStorage.clear();
        navigate('/create')
    }

    useEffect(() => {
        const newPlayerList = playerList.map((player) => {
            let newScore = 0;
            player.answers.forEach((answer, index) => {
                if (answer === player.result[index]) {
                    newScore += 1;
                }
            });
            return {
                ...player,
                score: newScore,
            };
        });
        setPlayerList(newPlayerList);
    }, []);

    const filteredPlayerList: IplayerList["playerList"] = searchText.trim() === '' ? playerList : playerList.filter(player => {
        return player.name.toLowerCase().includes(searchText.toLowerCase());
    });

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className='w-[50%] h-[50%] flex flex-col items-center justify-center outline outline-2 outline-offset-2 '>

                <div className=" w-full h-[20%] px-5 flex justify-between items-center">
                    <div className="text-[40px]  font-bold">Summary</div>
                    {match == currentMatch ? <button onClick={() => { onHandleNewGame() }} className=" w-[20%] h-[70%] border-2 border-black font-bold text-[2em] animate-pulse hover:border-white hover:shadow-lg hover:text-white hover:bg-slate-900 hover:animate-none">New game</button>
                        : <button onClick={() => onHandleNextMatch()} className=" w-[20%] h-[70%] border-2 border-black font-bold text-[2em] animate-pulse hover:border-white hover:shadow-lg hover:text-white hover:bg-slate-900 hover:animate-none">Next Match</button>
                    }
                </div>

                <div className="w-[90%] border-t-2 border-black border-dashed mb-5 "></div>

                <input className="text-[1em] p-2 w-[80%] h-[10%] border-2 border-b-0 border-black " type="text" value={searchText} onChange={(e) => { handleSearch(e.target.value) }} placeholder="Enter name..." style={{ background: "none" }} />

                <table className="w-[80%] h-[60%] border-2 border-black ">
                    <thead className=" h-[20%] ">
                        <tr className="text-[1.5em]  "> 
                            <th className="border-4 border-black ...">Player</th>
                            <th className="border-4 border-black ...">Answers</th>
                            <th className="border-4 border-black ...">Result</th>
                            <th className="border-4 border-black ...">Time</th>
                            <th className="border-4 border-black ...">Total point</th>
                        </tr>
                    </thead>
                    <tbody className=" h-[80%] border-2 border-black ">
                        {filteredPlayerList.map((player, index) => (
                            <tr key={index} className="border-2 border-black text-center text-[1.3em]">
                                <td className="border-2 border-black ...">{player.name}</td>
                                <td className="border-2 border-black ...">{player.answers.join(' , ')}</td>
                                <td className="border-2 border-black ...">{player.result.join(' ; ')}</td>
                                <td className="border-2 border-black ...">{player.time}</td>
                                <td className="border-2 border-black ...">{player.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-[25px] w-[100%] h-[10%] italic text-center "> --- {findWinner()} --- </div>
            </div>
        </div>

    );
}


