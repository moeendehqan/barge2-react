import axios from "axios"
import { useEffect, useState } from "react"
import { OnRun } from "../../config/OnRun"
import MsgInPage from "../../componets/msg/MsgInPage"
import { getCookie, setCookie } from "../../function/cookie"
import { useNavigate } from "react-router-dom"


const Login = ()=>{
    const [captchaImage,setCaptchaImage] = useState(null)
    const [msg,setMsg] = useState('')
    const [input,setInput] = useState({phone:'',captcha:'',captchaCrypto:'',phase:'phone',code:''})
    const navigate = useNavigate()



    const applyPhone = () =>{
        if (input.phone.length!=11) {setMsg('شماره همراه را به صورت صحیح وارد کنید')
        }else if(input.captcha.length!=4){setMsg('کد کپچا را به صورت صحیح وراد کنید')
        }else{
            setInput({...input,phase:'code'})
            axios({method:'POST', url:OnRun+'/applyphone',data:input
            }).then(response=>{
                if (response.data.replay){
                }else{
                    setInput({...input,phase:'phone'})
                    setMsg(response.data.msg)
                }
            })
        }
    }

    const applyCode = () =>{
        axios({method:'POST', url:OnRun+'/applycode',data:input
        }).then(response=>{
            if (response.data.replay) {
                setCookie('pua',response.data.cookie,10)
                navigate('/')
            }else{
                setMsg(response.data.msg)
            }
        })
    }


    const LoginByPUA = () =>{
        axios({method:'POST',url:OnRun+'/loginbypua',data:{pua:getCookie('pua')}
        }).then(response=>{
            if(response.data.replay){
                navigate('/')
            }
        })
    }




    const getCaptcha = () =>{
        axios({method:'POST',url:OnRun+'/getcaptcha'
        }).then(response=>{
            setInput({...input,captchaCrypto:response.data.captchaCode})
            const binaryString = atob(response.data.captchaImg)
            const bytes = new Uint8Array(binaryString.length)
            for (let i = 0; i < binaryString.length; i++){bytes[i]=binaryString.charCodeAt(i)}
            const imageUrl = URL.createObjectURL(new Blob([bytes], { type:'image/jpeg' }))
            setCaptchaImage(imageUrl)
        })
    }


    useEffect(getCaptcha,[])
    useEffect(LoginByPUA,[])
    return(
        <div className="pghlf">
            <section>
                <h2>ورود / ثبتنام</h2>

                {
                    input.phase=='phone'?
                    
                    <div className="frmLg">
                        <input value={input.phone} onChange={(e)=>setInput({...input,phone:e.target.value})} type="number" placeholder="شماره همراه"/>
                        {captchaImage?<img className="captchaImg" onClick={getCaptcha} src={captchaImage} />:null}
                        <input value={input.captcha} onChange={(e)=>setInput({...input,captcha:e.target.value})} type="number" placeholder="کد کپچا" />
                        <button onClick={applyPhone}>تایید</button>
                    </div>
                    :
                    <div className="frmLg">
                        <input value={input.code} onChange={(e)=>setInput({...input,code:e.target.value})} type="number" placeholder="کد تایید"/>
                        <button onClick={applyCode}>تایید</button>
                    </div>

                }


                <MsgInPage msg={msg} set={setMsg}/>

            </section>
            <img src="/img/loginVector.svg" />


        </div>
    )
}

export default Login