import axios from "axios"
import { useEffect, useState } from "react"
import { getCookie } from "../../function/cookie"
import { OnRun } from "../../config/OnRun"
import clipboardCopy from 'clipboard-copy';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiShow } from "react-icons/bi";

const PdfToText = () =>{
    const [file, setFile] = useState(null)
    const [option, setOption] = useState('fas')
    const [histori, setHistori] = useState([])
    const [result, setResult] = useState('')
    const pua = getCookie('pua')



    const apply = () =>{
        const data = new FormData()
        data.append('file',file)
        data.append('pua',pua)
        data.append('option',option)
        if (file!=null) {
            axios.post(OnRun+'/api/pdftotext',data)
                .then(response=>{
                    if(response.data.replay){
                        setHistori(response.data.histori)
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
            toast.warning('لطفا یک فایل را ضمیمه کنید',{position: toast.POSITION.BOTTOM_RIGHT,className: 'warning-toast'});
        }
    }

    const copy = () =>{
        clipboardCopy(result)
        toast.success('کپی شد!',{position: toast.POSITION.BOTTOM_RIGHT,className: 'postive-toast'});
    }

    const getHistori = () =>{
        axios.post(OnRun+'/gethistori/imagetotext',{'pua':pua})
            .then(response=>{
                if (response.data.replay) {
                    setHistori(response.data.histori)
                }else{
                    toast.error(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT,className: 'negetive-toast'});
                }
            })
            .catch(error=>{
                toast.error(error,{position: toast.POSITION.BOTTOM_RIGHT,className: 'negetive-toast'});
            })
    }


    const historiToResult = (item) =>{
        setResult(item)
        toast.success('تاریخچه!',{position: toast.POSITION.BOTTOM_RIGHT,className: 'postive-toast'});
    }

    useEffect(getHistori,[])

    return(
        <div className="sub">
            <ToastContainer autoClose={3000} />
            <div className="box">
                <h2>تبدیل پی دی اف به متن</h2>
                <section className="option">
                    <input  accept=".pdf" onChange={(e)=>setFile(e.target.files[0])} className='file' id='file' type='file'/>
                    <label className={file!=null?'selectedFile':''} htmlFor='file' >آپلود فایل</label>
                    <div className='rdi'>
                        <input checked={option=='eng'} onChange={e=>setOption(e.target.value)} id='en' type='radio' name="lng" value="eng"/>
                        <label htmlFor='en'>انگلیسی<span></span></label>
                        <input checked={option=='fas'} onChange={e=>setOption(e.target.value)} id='fa' type='radio' name="lng" value="fas"/>
                        <label htmlFor='fa'>فارسی<span></span></label>
                    </div>
                    <button className="applyBtn" onClick={apply}>تبدیل</button>
                </section>
                <section className="result">
                    <textarea value={result} onChange={e=>setResult(e.target.value)} />
                    <button onClick={copy}>کپی</button>

                </section>
                <section className="histori">
                    <h6>تاریخچه</h6>
                    <div className="items">
                        {
                            histori.map(i=>{
                                return(
                                    <div key={Math.floor(Math.random()*1000)} onClick={()=>historiToResult(i.result)} className="item">
                                        <p className="title">{i.filesName}</p>
                                        <p className="date">{i.JalaliDate}</p>
                                        <span><BiShow/></span>
                                    </div>
                                )
                            })
                        }

                    </div>



                </section>

            </div>
        </div>

    )
}

export default PdfToText