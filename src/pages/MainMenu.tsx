import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function MainMenu() {

    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.clear();
        localStorage.setItem('data', "");
        navigate('/create');
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center h-screen'>
                <FontAwesomeIcon icon={faGamepad} className="w-[10%] h-[10%] " />
                <h1 className="text-[50px] mt-[20px] mb-[40px]">Funny Game</h1>
                <a onClick={handleClick} className='w-[100%] flex justify-center'>
                    <button className=" w-[20%] mb-8 border-solid border-black border-2 text-[30px] p-2 hover:border-white hover:shadow-lg hover:text-white hover:bg-slate-900 ">Play game</button>
                </a>
            </div>
        </>
    )
}

export default MainMenu