interface IProps {
    round: number;
}
function LoadingRound({ round }: IProps) {
    return (
        <div className='w-[50%] h-[50%] flex flex-col items-center justify-center outline outline-2 outline-offset-2'>
         
            <div className="text-[40px] animate-ping">ROUND {round}</div>
            <div className="text-[30px] ">Loading...</div>
        </div>
    )
}

export default LoadingRound