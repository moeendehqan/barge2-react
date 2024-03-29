import axios from "axios"
import { useEffect, useState } from "react"
import { getCookie } from "../../function/cookie"
import { OnRun } from "../../config/OnRun"
import clipboardCopy from 'clipboard-copy';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiShow } from "react-icons/bi";
import {TiDeleteOutline} from "react-icons/ti"
import NavigateSubPage from '../../componets/navigateSubPage'
import Loader from "../../componets/loader"


const ImageToText = () =>{
    const [file, setFile] = useState(null)
    const [option, setOption] = useState('fas')
    const [histori, setHistori] = useState([])
    const [result, setResult] = useState('')
    const pua = getCookie('pua')
    const [loaderActiv, setLoaderActive] =useState(false)



    const apply = () =>{
        const data = new FormData()
        data.append('file',file)
        data.append('pua',pua)
        data.append('option',option)
        if (file!=null) {
            setLoaderActive(true)
            axios.post(OnRun+'/api/imagetotext',data)
            .then(response=>{
                    setLoaderActive(false)
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

    const historiDel = (fl,dt,rl) =>{
        setLoaderActive(true)
        
        axios.post(OnRun+'/delhistori',{type:'imagetotext',filename:fl,date:dt,pua:pua,result:rl})
        .then(response=>{
                setLoaderActive(false)
                if (response.data.replay) {
                    toast.success('حذف شد!',{position: toast.POSITION.BOTTOM_RIGHT,className: 'postive-toast'})
                    getHistori()
                }else{
                    toast.error(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT,className: 'negetive-toast'});
                }
            }).catch(error=>{
                toast.error(error,{position: toast.POSITION.BOTTOM_RIGHT,className: 'negetive-toast'});
            })
    }

    useEffect(getHistori,[])

    return(
        <div className="sub">
            <Loader active={loaderActiv} />
            <ToastContainer autoClose={3000} />
            <div className="box">
                <NavigateSubPage title={'تبدیل عکس به متن'}/>
                <section className="option">
                    <input  accept="image/*" onChange={(e)=>setFile(e.target.files[0])} className='file' id='file' type='file'/>
                    <label className={file!=null?'selectedFile':''} htmlFor='file' >بارگذاری تصویر</label>
                    <div className='rdi'>
                        <input checked={option=='eng'} onChange={e=>setOption(e.target.value)} id='en' type='radio' name="lng" value="eng"/>
                        <label htmlFor='en'>انگلیسی<span></span></label>
                        <input checked={option=='fas'} onChange={e=>setOption(e.target.value)} id='fa' type='radio' name="lng" value="fas"/>
                        <label htmlFor='fa'>فارسی<span></span></label>
                        <input checked={option=='are'} onChange={e=>setOption(e.target.value)} id='ar' type='radio' name="lng" value="are"/>
                        <label htmlFor='ar'>عربی<span></span></label>
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
                                    <div key={Math.floor(Math.random()*1000)}  className="item">
                                        <p className="title">{i.filesName}</p>
                                        <p className="date">{i.JalaliDate}</p>
                                        <div className="btns">
                                            <span onClick={()=>historiToResult(i.result)}><BiShow/></span>
                                            <span onClick={()=>historiDel(i.filesName,i.JalaliDate,i.result)}><TiDeleteOutline/></span>
                                        </div>
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

export default ImageToText