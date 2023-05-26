import axios from "axios"
import { useEffect, useState } from "react"
import { OnRun } from "../../config/OnRun"




const Login = ()=>{
    const [captchaCrypto,setCaptchaCrypto] = useState(null)
    const [captchaImage,setCaptchaImage] = useState(null)


    const getCaptcha = () =>{
        axios({method:'POST',url:OnRun+'/getcaptcha'
        }).then(response=>{
            setCaptchaCrypto(response.data.captchaCode)
            const binaryString = atob(response.data.captchaImg)
            const bytes = new Uint8Array(binaryString.length)
            for (let i = 0; i < binaryString.length; i++){bytes[i]=binaryString.charCodeAt(i)}
            const imageUrl = URL.createObjectURL(new Blob([bytes], { type:'image/jpeg' }))
            setCaptchaImage(imageUrl)
        })
    }


    useEffect(getCaptcha,[])
    return(
        <div className="pghlf">
            <section>
                <h2>ورود / ثبتنام</h2>

                <div>
                    <input type="number" placeholder="شماره همراه"/>
                    {captchaImage?<img className="captchaImg" onClick={getCaptcha} src={captchaImage} />:null}
                    <input type="number" placeholder="کد کپچا" />
                    <button>تایید</button>
                </div>

            </section>
            <img src="/img/loginVector.svg" />


        </div>
    )
}

export default Login