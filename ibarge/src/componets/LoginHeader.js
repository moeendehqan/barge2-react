
import axios from "axios";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom"
import { OnRun } from "../config/OnRun";
import { getCookie, setCookie } from "../function/cookie";
import { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { AiFillHeart , AiOutlineHeart} from "react-icons/ai";

const LoginHeader = () =>{
    const navigate = useNavigate()
    const [user,setUser] =useState(null)



    
    const getUserByPUA = () =>{
        axios({method:'POST',url:OnRun+'/getuserbypua',data:{pua:getCookie('pua')}
        }).then(response=>{
            if(response.data.replay){
                setUser(response.data.user)
            }else{
                setUser(null)
            }
        })
    }


    const exit = () =>{
        setCookie('pua','',0)
        navigate('/')
    }

    useEffect(getUserByPUA,[])

    return(
        <div className="LoginHeader">
            {
                user==null?
                <section className="login" onClick={()=>navigate('/desk/login')}>
                    <p>ورود</p>
                    <span><FiLogIn/></span>
                </section>
                :
                <section className="login">
                    {
                        user.fullname?
                        <h4 className="nameUser">{user.fullname}</h4>
                        :
                        <h4 className="nameUser">{user.phone}</h4>

                    }
                    <div className="hearts">
                        {
                            user.hearts.map(i=>{
                                if (i) {return(<p key={(Math.random())}><AiFillHeart/></p>)                                    
                                }else{return(<p key={(Math.random())}><AiOutlineHeart/></p>)}
                            })
                        }
                    </div>
                    <div className="mnhb">
                        <span><BiMenu/></span>
                        <div className="mnhb-mn">
                            <p>{user.creditDay} روز اعتبار</p>
                            <p className="mnhb-btn" onClick={()=>navigate('/desk/profile')}>پروفایل</p>
                            <p className="mnhb-btn" onClick={()=>navigate('/desk/price')}>افزایش اعتبار</p>
                            <p className="mnhb-btn" onClick={exit}>خروج</p>
                        </div>
                    </div>


                                

                </section>
            }
        </div>
    )
}

export default LoginHeader