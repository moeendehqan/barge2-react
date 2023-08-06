import { useNavigate } from "react-router-dom"




const MenuAdmin = () =>{
    const navigate = useNavigate()

    return(
        <div className="admn-menu">
            <button onClick={()=>navigate('users')}>کاربران</button>
            <button onClick={()=>navigate('otp')}>پیامک های تایید</button>
            <button onClick={()=>navigate('payment')}>خرید ها</button>
            <button onClick={()=>navigate('action')}>قعالیت ها</button>
            <button onClick={()=>navigate('support')}>پشتیبانی</button>
        </div>
    )
}


export default MenuAdmin