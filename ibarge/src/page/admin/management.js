
import MenuAdmin from "../../componets/admin/menu"
import { Outlet, useNavigate } from "react-router-dom"
import { getCookie, setCookie } from "../../function/cookie"
import axios from "axios"
import { OnRun } from "../../config/OnRun"
import { useEffect } from "react"
const Management = () =>{
    const cliadmin = getCookie('cliadmin')
    const navigate = useNavigate()
    const checkCookie = () =>{
        axios.post(OnRun+'/admin/cookie',{cliadmin:cliadmin})
        .then(response=>{
            if (!response.data.reply) {
                setCookie('cliadmin','',0)
                navigate('/management')
            }
        })
    }
    useEffect(checkCookie,[])
    return(
        <div className="Management">
            <MenuAdmin/>
            <Outlet/>
        </div>
    )
}

export default Management