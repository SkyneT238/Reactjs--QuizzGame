import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { IDataProps } from '../App';
import { useNavigate } from 'react-router-dom';
interface IData {
  match: IDataProps["match"];
  onHandleSetMatch: (value: number) => void
}
function CreateMatch({ match, onHandleSetMatch }: IData) {

  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className='w-[50%] h-[50%] flex flex-col items-center justify-center outline outline-2 outline-offset-2'>
        <div className='text-[4em] h-[20%] font-bold'>Choice Match</div>
        <div className='flex items-center justify-center gap-[3em] w-[40%] h-[40%]'>
          <div className='text-[6em] text-end w-[50%]'>{match}</div>
          <div className='flex flex-col gap-5 w-[50%] justify-between items-begin '>
            <FontAwesomeIcon onClick={() => onHandleSetMatch(1)} className='border-2 w-[3em] h-[3em] border-black hover:border-white hover:shadow-lg hover:text-white hover:bg-slate-900' icon={faChevronUp} />
            <FontAwesomeIcon onClick={() => onHandleSetMatch(-1)} className='border-2 w-[3em] h-[3em] border-black  hover:border-white hover:shadow-lg hover:text-white hover:bg-slate-900' icon={faChevronDown} />
          </div>
        </div>
        <button onClick={() => (navigate('/play-game'))} className=" w-[50%] border-solid border-black border-2 text-[30px] p-2 hover:border-white hover:shadow-lg hover:text-white hover:bg-slate-900">Start game</button>
      </div>
    </div>
  )
}

export default CreateMatch