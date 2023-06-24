import axios from "axios"
import { useEffect, useState } from "react"
import { getCookie } from "../../function/cookie"
import { OnRun } from "../../config/OnRun"
import clipboardCopy from 'clipboard-copy';
import { ToastContainer, toast } from 'react-toastify';
import { BiShow } from "react-icons/bi";
import { rgbToHex ,invertRgbColor} from "../../function/rgbToHex";
import { RxCopy } from "react-icons/rx";
import NavigateSubPage from '../../componets/navigateSubPage'
import {TiDeleteOutline} from "react-icons/ti"

const ExtractColors = () =>{
    const [file, setFile] = useState(null)
    const [option, setOption] = useState(5)
    const [histori, setHistori] = useState([])
    const [result, setResult] = useState([])
    const pua = getCookie('pua')




    const apply = () =>{
        const data = new FormData()
        data.append('file',file)
        data.append('pua',pua)
        data.append('option',option)
        if (file!=null) {
            axios.post(OnRun+'/api/extractcolors',data)
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

    const copyItem = (item) =>{
        clipboardCopy(item)
        toast.success('کپی شد!',{position: toast.POSITION.BOTTOM_RIGHT,className: 'postive-toast'});
    }

    const getHistori = () =>{
        axios.post(OnRun+'/gethistori/extractcolors',{'pua':pua})
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

    const changeOption = (e) =>{
        if (e>1 && e<=100) {
            setOption(e)
        }else{
            toast.warning('تعداد باید بین 1 و 100 باشد',{position: toast.POSITION.BOTTOM_RIGHT,className: 'warning-toast'});

        }
    }

    const historiToResult = (item) =>{
        setResult(item)
        toast.success('تاریخچه!',{position: toast.POSITION.BOTTOM_RIGHT,className: 'postive-toast'});
    }

    const historiDel = (fl,dt,rl) =>{
        axios.post(OnRun+'/delhistori',{type:'extractcolors',filename:fl,date:dt,pua:pua,result:rl})
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
                <NavigateSubPage title={'استخراج رنگ از تصویر'}/>
                <section className="option">
                    <input  accept="image/*" onChange={(e)=>setFile(e.target.files[0])} className='file' id='file' type='file'/>
                    <label className={file!=null?'selectedFile':''} htmlFor='file' >بارگذاری تصویر</label>

                    <div className='rdi'>
                        <p className="titleInput">تعداد</p>
                        <input className="inputOption" value={option} onChange={e=>changeOption(e.target.value)} type="number" />
                    </div>
                    <button className="applyBtn" onClick={apply}>استخراج</button>
                </section>
                <section className="result">
                    <div className="colorBox">
                        {
                            result.map(i=>{

                                const backgroundColor = 'rgb(' + String(i) + ')'
                                return(
                                    <div className="colorItem" style={{background:backgroundColor}} onClick={()=>copyItem(rgbToHex(i[0],i[1],i[2]))}>
                                        <p style={{color:invertRgbColor(backgroundColor)}}>{rgbToHex(i[0],i[1],i[2])}</p>
                                        <div className="copyItem">
                                            <span><RxCopy/></span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>


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

export default ExtractColors