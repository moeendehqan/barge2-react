

import { getCookie, setCookie } from "../../function/cookie"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { OnRun } from "../../config/OnRun"

import axios from "axios"


const ReturnPay = () =>{
    const pua = getCookie('pua')
    const navigate = useNavigate()

    const CheckPaid = () =>{
        axios.post(OnRun+'/pay/check',{pua:pua})
            .then(response=>{
                console.log(response.data)
            })
        
    }



    const getUserByPUA = () =>{
        axios({method:'POST',url:OnRun+'/getuserbypua',data:{pua:pua}
        }).then(response=>{
            if(response.data.replay){
                CheckPaid()

            }else{
                navigate('/')
            }
        })
    }





    useEffect(getUserByPUA,[])

    return(
        <div>


        </div>
    )
}


export default ReturnPay