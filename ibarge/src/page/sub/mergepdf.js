import axios from "axios"
import { useEffect, useState } from "react"
import { getCookie } from "../../function/cookie"
import { OnRun } from "../../config/OnRun"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiShow } from "react-icons/bi";
import NavigateSubPage from "../../componets/navigateSubPage";

const MergePdf = () =>{
    const [file1, setFile1] = useState(null)
    const [file2, setFile2] = useState(null)

    const [histori, setHistori] = useState([])
    const [result, setResult] = useState('')
    const pua = getCookie('pua')


    const apply = () =>{
        const data = new FormData()
        data.append('file1',file1)
        data.append('file2',file2)
        data.append('pua',pua)
        if (file1!=null && file2!=null) {
            axios.post(OnRun+'/api/mergepdf',data)
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



    const getHistori = () =>{
        axios.post(OnRun+'/gethistori/mergepdf',{'pua':pua})
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
                console.log(response.data)
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



    useEffect(getHistori,[])
    return(
        <div className="sub">
            <ToastContainer autoClose={3000} />
            <div className="box">
                <NavigateSubPage title={'ادغام پی دی اف'}/>
                <section className="option">
                    <input  accept=".pdf" onChange={(e)=>setFile1(e.target.files[0])} className='file' id='file1' type='file'/>
                    <label className={file1!=null?'selectedFile':''} htmlFor='file1' >بارگذاری پی دی اف</label>
                    <input  accept=".pdf" onChange={(e)=>setFile2(e.target.files[0])} className='file' id='file2' type='file'/>
                    <label className={file2!=null?'selectedFile':''} htmlFor='file2' >بارگذاری پی دی اف</label>
                    <button className="applyBtn" onClick={apply}>ادغام</button>
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

export default MergePdf