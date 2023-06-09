import axios from "axios"
import { useEffect, useState } from "react"
import { getCookie } from "../../function/cookie"
import { OnRun } from "../../config/OnRun"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiShow } from "react-icons/bi";
import NavigateSubPage from "../../componets/navigateSubPage";
import {TiDeleteOutline} from "react-icons/ti"

const ImageFromPdf = () =>{
    const [file, setFile] = useState(null)

    const [histori, setHistori] = useState([])
    const [result, setResult] = useState('')
    const pua = getCookie('pua')


    const apply = () =>{
        const data = new FormData()
        data.append('file',file)
        data.append('pua',pua)
        if (file!=null) {
            axios.post(OnRun+'/api/imagefrompdf',data)
            .then(response=>{
                    if(response.data.replay){
                        setHistori(response.data.histori)
                        setResult(response.data.result)
                        toast.success(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT,className: 'postive-toast'});
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



    const getHistori = () =>{
        axios.post(OnRun+'/gethistori/compressimage',{'pua':pua})
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


    const download = () =>{
        axios.get(OnRun+'/download/'+result,{responseType: 'blob'})
            .then(response=>{
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', result);
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            })
    }

    const historiToResult = (item) =>{
        setResult(item)
        toast.success('تاریخچه!',{position: toast.POSITION.BOTTOM_RIGHT,className: 'postive-toast'});
    }

    const historiDel = (fl,dt,rl) =>{
        axios.post(OnRun+'/delhistori',{type:'compressimage',filename:fl,date:dt,pua:pua,result:rl})
            .then(response=>{
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
            <ToastContainer autoClose={3000} />
            <div className="box">
                <NavigateSubPage title={'استخراج عکس از پی دی اف'}/>

                <section className="option">
                    <input  accept=".pdf" onChange={(e)=>setFile(e.target.files[0])} className='file' id='file' type='file'/>
                    <label className={file!=null?'selectedFile':''} htmlFor='file' >بارگذاری پی دی اف</label>
                    <button className="applyBtn" onClick={apply}>استخراج</button>
                </section>
                <section className="result">
                    {
                        result===''?null:
                        <button onClick={download}>دریافت</button>
                    }
                </section>
                <section className="histori">
                    <h6>تاریخچه</h6>
                    <div className="items">
                        {
                            histori.map(i=>{
                                return(
                                    <div key={Math.floor(Math.random()*1000)} className="item">
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

export default ImageFromPdf