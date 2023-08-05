import axios from "axios"
import { useEffect, useState } from "react"
import { OnRun } from "../../config/OnRun"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../../function/cookie";




const LgAdmin = () =>{
    const [inp,setInp] = useState({'username':'','password':''})
    const navigate = useNavigate()
    const cliadmin = getCookie('cliadmin')

    const apply = () =>{
        axios.post(OnRun+'/admin/login',inp)
        .then(response=>{
            if (response.data.reply) {
                setCookie('cliadmin',response.data.cliadmin,2)
                navigate('/management')
            }else{
                toast.error(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT,className: 'negetive-toast'});
            }
        })
    }

    const checkCookie = () =>{
        axios.post(OnRun+'/admin/cookie',{cliadmin:cliadmin})
        .then(response=>{
            if (response.data.reply) {
                setCookie('cliadmin',cliadmin,2)
                navigate('/management')
            }else{
                setCookie('cliadmin','',0)
            }
        })
    }

    useEffect(checkCookie,[])
    return(
        <div className="lg-adm">
            <ToastContainer autoClose={3000} />
            <div className="cntnr">
                <input value={inp.username} onChange={(e)=>setInp({...inp,username:e.target.value})}/>
                <input value={inp.password} onChange={(e)=>setInp({...inp,password:e.target.value})}/>
                <button onClick={apply}>login</button>
            </div>
        </div>
    )
}


export default LgAdmin