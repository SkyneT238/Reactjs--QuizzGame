import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle} from '@fortawesome/free-solid-svg-icons';
interface IProps {
  
  currenMatch: number;
}
function LoadingMatch({ currenMatch }: IProps) {
  return (
    <div className='w-[50%] h-[50%] flex flex-col items-center justify-center outline outline-2 outline-offset-2 gap-5'>
      <div className='text-[40px] animate-bounce'>Loading Match {currenMatch} ...</div>
      <FontAwesomeIcon className='animate-pulse' icon={faShuffle} style={{ width: '35%', height: '35%' }} />
    </div>
  );
}


export default LoadingMatch