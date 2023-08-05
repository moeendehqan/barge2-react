import { useNavigate } from "react-router-dom"

const Footer = () =>{
    const navigate = useNavigate()
    return(
        <footer>
            <div className="logo">
                <img src="/img/Breadboard-right.png"/>
                <img src="/img/barge-type.png"/>
                <img src="/img/Breadboard-left.png"/>
            </div>
            <div className="box">
                <div class='BusinessPartners'>
                    <a referrerpolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=332417&amp;Code=f8yh6H5uMQIUjFmVw6Hx">
                        <img referrerpolicy="origin" src="https://Trustseal.eNamad.ir/logo.aspx?id=332417&amp;Code=f8yh6H5uMQIUjFmVw6Hx" alt=""  id="f8yh6H5uMQIUjFmVw6Hx"/>
                    </a>
                    <span id="PPTrust" >
                        <script src="https://statics.payping.ir/trust-v3.js"
                            theme="light"
                            size="md" ></script>
                    </span>
                </div>
                <div class='links'>
                    <p onClick={()=>navigate('/desk/roles')}>قوانین</p>
                    <p onClick={()=>navigate('/desk/faq')}>سوالات متداول</p>
                    <p>ارتباط با ما</p>
                </div>

            </div>

        </footer>
    )
}


export default Footer