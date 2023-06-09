import axios from "axios"
import { useEffect, useState } from "react"
import { getCookie } from "../../function/cookie"
import { OnRun } from "../../config/OnRun"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiShow } from "react-icons/bi";

import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import gregorian from "react-date-object/calendars/gregorian"
import persian_fa from "react-date-object/locales/persian_fa"
import gregorian_fa from "react-date-object/locales/gregorian_fa"



const ConvertDate = () =>{
    const [option, setOption] = useState('fromShamsi')
    const [date, setDate] = useState(new DateObject)
    const [result, setResult] = useState('')
    const pua = getCookie('pua')


    const apply = () =>{
        if (date) {
            axios.post(OnRun+'/api/convertdate',{option:option,date:date,pua:pua})
                .then(response=>{
                    if(response.data.replay){
                        setResult(response.data.result)
                    }else{
                        toast.error(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT,className: 'negetive-toast'});
                    }

                })
                .catch(error=>{
                    toast.error(error,{position: toast.POSITION.BOTTOM_RIGHT,className: 'negetive-toast'});
                })
        }
    }




    useEffect(apply,[date,option])

    return(
        <div className="sub">
            <ToastContainer autoClose={3000} />
            <div className="box">
                <h2>تبدیل پی دی اف به ورد</h2>
                <section className="option">
                    <div className='rdi'>
                        <input checked={option=='fromGorgian'} onChange={e=>setOption(e.target.value)} id='gr_sh' type='radio' name="type" value="fromGorgian"/>
                        <label htmlFor='gr_sh'>از میلادی<span></span></label>
                        <input checked={option=='fromShamsi'} onChange={e=>setOption(e.target.value)} id='sh_gr' type='radio' name="type" value="fromShamsi"/>
                        <label htmlFor='sh_gr'>از خورشیدی<span></span></label>
                    </div>
                    <div className='rdi'>
                        {
                            option=='fromShamsi'?
                            <DatePicker  calendar={persian} locale={persian_fa} value={date} onChange={(e)=>setDate(e)}/>
                            :<DatePicker  calendar={gregorian} locale={gregorian_fa} value={date} onChange={(e)=>setDate(e)}/>
                        }
                    </div>
                </section>
                <section className="result">
                    {
                        result===''?null:
                        <div className="convertdatebox">
                            <div className='dateBorj'>
                                <div>
                                    <h6>برج فلکی</h6>
                                    <p id='borjname'>{result.borj.borjname}</p>
                                </div>
                                <img id='borjimg' src={process.env.PUBLIC_URL + '/icon/borj/' + result.borj.borjFilename} />
                            </div>
                            <div className='dateBox'>
                                <h6>خورشیدی</h6>
                                <p id='jalalistr'>{result.jalali.str}</p>
                                <p id='jalaliint'>{result.jalali.int}</p>
                            </div>
                            <div className='dateBox'>
                                <h6>میلادی</h6>
                                <p id='miladistr' >{result.miladi.str}</p>
                                <p id='miladiint' >{result.miladi.int}</p>
                            </div>
                            <div className='dateBox'>
                                <h6>قمری</h6>
                                <p id='hijristr' >{result.hijri.str}</p>
                                <p id='hijriint' >{result.hijri.int}</p>
                            </div>
                        </div>
                    }
                </section>


            </div>
        </div>

    )
}

export default ConvertDate