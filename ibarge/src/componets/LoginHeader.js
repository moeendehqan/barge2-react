
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom"


const LoginHeader = () =>{
    const navigate = useNavigate()

    return(
        <div className="LoginHeader">
            <section className="login" onClick={()=>navigate('/desk/login')}>
                <p>ورود</p>
                <span><FiLogIn/></span>
            </section>
        </div>
    )
}

export default LoginHeader