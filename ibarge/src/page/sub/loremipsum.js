import axios from "axios"
import { useEffect, useState } from "react"
import { getCookie } from "../../function/cookie"
import { OnRun } from "../../config/OnRun"
import clipboardCopy from 'clipboard-copy';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiShow } from "react-icons/bi";

const LoremIpsum = () =>{
    const [amount, setAmount] = useState(1)
    const [option, setOption] = useState('prg')
    const [histori, setHistori] = useState([])
    const [result, setResult] = useState('')
    const pua = getCookie('pua')



    const apply = () =>{
        if (amount>0) {
            axios.post(OnRun+'/api/loremipsum',{pua:pua, amount:amount, option:option})
                .then(response=>{
                    if(response.data.replay){
                        setResult(response.data.result)
                        toast.success('عملیات انجام شد',{position: toast.POSITION.BOTTOM_RIGHT,className: 'postive-toast'});
                    }else{
                        toast.error(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT,className: 'negetive-toast'});
                    }
                })
                .catch(error=>{
                    toast.error(error,{position: toast.POSITION.BOTTOM_RIGHT,className: 'negetive-toast'});
                })
        }else{
            toast.warning('مقدار را صحیح وارد کنید',{position: toast.POSITION.BOTTOM_RIGHT,className: 'warning-toast'});
        }
    }

    const copy = () =>{
        clipboardCopy(result)
        toast.success('کپی شد!',{position: toast.POSITION.BOTTOM_RIGHT,className: 'postive-toast'});
    }

    return(
        <div className="sub">
            <ToastContainer autoClose={3000} />
            <div className="box">
                <h2>تبدیل عکس به متن</h2>
                <section className="option">
                    <input className="inputNumber" type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} />
                    <div className='rdi'>
                        <input checked={option=='prg'} onChange={e=>setOption(e.target.value)} id='prg' type='radio' value="prg"/>
                        <label htmlFor='prg'>پاراگراف<span></span></label>
                        <input checked={option=='snt'} onChange={e=>setOption(e.target.value)} id='snt' type='radio' value="snt"/>
                        <label htmlFor='snt'>جمله<span></span></label>
                        <input checked={option=='wrd'} onChange={e=>setOption(e.target.value)} id='wrd' type='radio' value="wrd"/>
                        <label htmlFor='wrd'>کلمه<span></span></label>
                    </div>
                    <button className="applyBtn" onClick={apply}>تبدیل</button>
                </section>
                <section className="result">
                    <textarea value={result} onChange={e=>setResult(e.target.value)} />
                    <button onClick={copy}>کپی</button>

                </section>
            </div>
        </div>

    )
}

export default LoremIpsum