import Nav from "./Nav"
import LoginHeader from "./LoginHeader"
import { useNavigate } from "react-router-dom"

const Header = () =>{
    const navigate = useNavigate()







    return(
        <header>
            <div className="logo">
                <img onClick={()=>navigate('/')} src="/img/barge.png"/>
            </div>
            <Nav />
            <LoginHeader />

        </header>
    )
}

export default Header