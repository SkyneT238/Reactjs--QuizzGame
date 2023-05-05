import React, { useState, useEffect } from 'react'
import LoadingRound from '../components/Loading/LoadingRound';
import LoadingMatch from '../components/Loading/LoadingMatch';
import RoundGame from '../components/RoundGame';
import { useNavigate } from 'react-router-dom';

import { IDataProps as IProps } from '../App';

interface IData {
    playerList: IProps["playerData"];
    round: IProps["round"];
    time: IProps["levelTime"];
    match: IProps["match"];
    answers?: string;
    setPlayerData: React.Dispatch<React.SetStateAction<IProps["playerData"]>>;
}

function PlayGame({ round, playerList, time, match, setPlayerData }: IData) {

    const [renderCount, setRenderCount] = useState<number>(0);
    const [currenRound, setCurrenRound] = useState<IData["round"]>(JSON.parse(`${localStorage.getItem("round")}`) || 1);
    const [players, setPlayers] = useState<IData["playerList"]>(playerList);
    const [currenTurn, setCurrenTurn] = useState<number>(JSON.parse(`${localStorage.getItem("turn")}`) || 0);

    const [key, setKey] = useState<string>("");
    const [quesList, setQuesList] = useState<string[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingMatch, setIsLoadingMatch] = useState<boolean>(true);

    const navigate = useNavigate();

    const getQues = async () => {
        fetch('https://opentdb.com/api.php?amount=1&type=multiple')
            .then(response => response.json())
            .then(data => {
                let ques: string[] = [data.results[0].question];
                const key = data.results[0].correct_answer;
                const choice = data.results[0].incorrect_answers;

                ques = ques.concat(choice);

                const randomIndex = Math.floor(Math.random() * 4) + 1;
                ques.splice(randomIndex, 0, key);

                setQuesList(ques);
                let newKey: string = findPlace(key, ques);
                setKey(newKey);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    };

    const setLoadingAfterOneSecond = () => {
        setTimeout(() => {
            setIsLoadingMatch(false);
        }, 1000);
    }

    const findPlace = (value: string, array: string[]): string => {
        for (let i: number = 1; i < 5; i++) {
            if (array[i] === value) {
                return String.fromCharCode(64 + i);
            }
        }
        return "Empty";
    }

    const changData = (value: string, totalTime: number): void => {
        const newPlayers: IData["playerList"] = [...players];
        let choiceList: string[] = players[currenTurn].answers;
        let resultList: string[] = players[currenTurn].result;
        const newTime: number = players[currenTurn].time + totalTime;

        let newValue: string = findPlace(value, quesList);
        choiceList = [...choiceList, newValue];
        resultList = [...resultList, key];
        newPlayers[currenTurn].answers = choiceList;
        newPlayers[currenTurn].result = resultList;
        newPlayers[currenTurn].time = newTime;
        setPlayers(newPlayers);
        localStorage.setItem("playerData", JSON.stringify(newPlayers));
    }

    // check key same quizzlet update in future
    // const checkKey = (value: string): Promise<void> => {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve();
    //         }, 1000);
    //     });
    // };

    const onHandleSubmit = async (value: string, turn: number, totalTime: number): Promise<void> => {

        changData(value, totalTime);

        let newTurn = 0;
        let newRound = 0;
        if (turn + 1 === players.length) {
        
            newRound = currenRound + 1;
            setCurrenRound(newRound);
            setCurrenTurn(0);
            setIsLoading(true);
        } else {
            newTurn = turn + 1;
            setCurrenTurn(newTurn);
            setIsLoading(true);
        }

        //await checkKey(value);

        getQues();

        localStorage.setItem("turn", JSON.stringify(newTurn));
    };

    useEffect(() => {

        if (currenRound - 1 == round) {
            setPlayerData(players);
            navigate('/summary');
            localStorage.setItem("match", JSON.stringify(match));
        }

        if(round == 0 ) return;
        localStorage.setItem("round", JSON.stringify(currenRound));

    }, [currenRound]);

    useEffect(() => {

        if (!isLoadingMatch) return;
        setLoadingAfterOneSecond();

    }, [isLoadingMatch]);

    useEffect(() => {
        if (renderCount > 0) {
            getQues();
        }
    }, [renderCount]);

    useEffect(() => {
        setRenderCount(renderCount + 1);
    }, []);

    return (
        <div className="w-full h-full flex justify-center items-center">
            {isLoadingMatch ? (
                <LoadingMatch currenMatch={match} />
            ) : isLoading ? (
                <LoadingRound round={currenRound} />
            ) : (
                <RoundGame
                    quests={quesList}
                    onHandleSubmit={onHandleSubmit}
                    time={time}
                    round={currenRound}
                    player={playerList[currenTurn]}
                    playerChoice={""}
                    turn={currenTurn}
                />
            )}
        </div>
    );
}

export default PlayGame 