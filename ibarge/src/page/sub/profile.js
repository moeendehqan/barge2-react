import axios from "axios"
import { useEffect, useState } from "react"
import { OnRun } from "../../config/OnRun"
import MsgInPage from "../../componets/msg/MsgInPage"
import { getCookie, setCookie } from "../../function/cookie"
import { useNavigate } from "react-router-dom"
import { MdOutlineMan , MdOutlineWoman2 } from "react-icons/md";
import Button from "react-multi-date-picker/components/button"
import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import NavigateSubPage from "../../componets/navigateSubPage"

const Profile = ()=>{

    const [msg,setMsg] = useState('')
    const [user,setUser] = useState({type:'حقیقی',phone:'',sex:'مرد'})
    const navigate = useNavigate()

    const getUserByPUA = () =>{
        axios({method:'POST',url:OnRun+'/getuserbypua',data:{pua:getCookie('pua')}
        }).then(response=>{
            if(response.data.replay){
                if (Object.keys(response.data.user).includes('dateBirth')) {
                    response.data.user.dateBirth = new DateObject(new Date(response.data.user.dateBirth))
                }
                setUser(response.data.user)
            }else{
                navigate('/')
            }
        })
    }


    const applyProfile = () =>{
        if ((user.type=='حقیقی') && (!(user.fullname) || user.fullname=='')) {setMsg('نام را وارد کنید')
        }else if((user.type=='حقیقی') && !(user.sex)) {setMsg('جنسیت را مشخص کنید')
        }else if((user.type=='حقیقی') && !(user.dateBirth)) {setMsg('تاریخ تولد را انتخاب کنید')
        }else if((user.type=='حقیقی') && !(user.email)) {setMsg('لطفا ایمیل را وارد کنید')
        }else if((user.type=='حقوقی') && (!(user.companyName) || (user.companyName==''))){setMsg('لطفا نام شرکت را وارد کنید')
        }else if((user.type=='حقوقی') && (!(user.nationalId) || (user.nationalId==''))){setMsg('لطفا شناسه ملی را وارد کنید')
        }else if((user.type=='حقوقی') && (!(user.registerId) || (user.registerId==''))){setMsg('لطفا شماره ثبت را وارد کنید')
        }else if((user.type=='حقوقی') && (!(user.address) || (user.address==''))){setMsg('لطفا آدرس را وارد کنید')
        }else if((user.type=='حقوقی') && (!(user.postCode) || (user.postCode==''))){setMsg('لطفا کد پستی را وارد کنید')
        }else if((user.type=='حقوقی') && (!(user.email) || (user.email==''))){setMsg('لطفا ایمیل را وارد کنید')
        }else{
            axios({method:'POST',url:OnRun+'/setprofile',data:user
            }).then(response=>{
                console.log(response.data)
            })
        }
    }


    useEffect(getUserByPUA,[])
    return(
        <div className="pghlf">
            <section>
            <NavigateSubPage title={'پروفایل'}/>

                <div className="intRdi">
                    <input checked={user.type == 'حقوقی'} onChange={(e)=>setUser({...user,type:e.target.value})} type="radio" id="comp" value='حقوقی'/>
                    <label htmlFor="comp">حقوقی</label>
                    <input checked={user.type == 'حقیقی'} onChange={(e)=>setUser({...user,type:e.target.value})} type="radio" id="prsn" value='حقیقی'/>
                    <label htmlFor="prsn">حقیقی</label>
                </div>
                {
                    user.type=='حقیقی'?
                    <div className="prflFrm">
                        <input placeholder="نام کامل" value={user.fullname} onChange={(e)=>setUser({...user,fullname:e.target.value})}/>
                        <div className="inpRdiIcn">
                            <input checked={user.sex == 'مرد'} onChange={(e)=>setUser({...user,sex:e.target.value})} type="radio" id="man" value='مرد'/>
                            <label htmlFor="man"><span><MdOutlineMan/></span></label>
                            <input checked={user.sex == 'زن'} onChange={(e)=>setUser({...user,sex:e.target.value})} type="radio" id="female" value='زن'/>
                            <label htmlFor="female"><span><MdOutlineWoman2/></span></label>
                        </div>
                        <div className="datebirth">
                            <p>تاریخ تولد</p>
                            <DatePicker  placeholder="تاریخ تولد" render={<Button/>} calendar={persian} locale={persian_fa} value={user.dateBirth} onChange={(e)=>setUser({...user,dateBirth:e})}/>
                        </div>
                        <input placeholder="ایمیل" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
                    </div>
                    :
                    <div className="prflFrm">
                        <input placeholder="نام شرکت" value={user.companyName} onChange={(e)=>setUser({...user,companyName:e.target.value})}/>
                        <input type="number" placeholder="شناسه ملی" value={user.nationalId} onChange={(e)=>setUser({...user,nationalId:e.target.value})}/>
                        <input type="number" placeholder="شماره ثبت" value={user.registerId} onChange={(e)=>setUser({...user,registerId:e.target.value})}/>
                        <input placeholder="آدرس" value={user.address} onChange={(e)=>setUser({...user,address:e.target.value})}/>
                        <input type="number" placeholder="کدپستی" value={user.postCode} onChange={(e)=>setUser({...user,postCode:e.target.value})}/>
                        <input placeholder="ایمیل" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
                    </div>
                }
                <button onClick={applyProfile}>ثبت</button>

                <MsgInPage msg={msg} set={setMsg}/>

            </section>
            <img src="/img/loginVector.svg" />


        </div>
    )
}

export default Profile