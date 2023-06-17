import { useNavigate } from "react-router-dom"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const NavigateSubPage = (props) =>{
    const navigate = useNavigate()

    return(
        <div className="navigate">
            <h2 className="homeNav" onClick={()=>navigate('/')}>خانه</h2>
            <span><MdOutlineKeyboardArrowLeft/></span>
            <h2>{props.title}</h2>
        </div>
    )
}


export default NavigateSubPage