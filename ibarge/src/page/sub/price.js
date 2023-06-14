import axios from "axios"
import { useEffect, useState } from "react"

import { getCookie, setCookie } from "../../function/cookie"
import { useNavigate } from "react-router-dom"

import DatePicker, { DateObject } from "react-multi-date-picker"

import { OnRun } from "../../config/OnRun"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Price = ()=>{

    const [user,setUser] = useState({type:'حقیقی',phone:'',sex:'مرد'})
    const [pay,setPay] = useState('pay1')
    const navigate = useNavigate()
    const pua = getCookie('pua')

    const getUserByPUA = () =>{
        axios({method:'POST',url:OnRun+'/getuserbypua',data:{pua:pua}
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
        if (pay!='') {
            axios.post(OnRun+'/pay/create',{pay:pay,pua:pua})
                .then(response=>{
                    if (response.data.replay) {
                        console.log(response.data)
                        window.location.href = 'https://api.payping.ir/v2/pay/gotoipg/'+response.data.responseCode
                    }else{
                        toast.error(response.data.msg,{position: toast.POSITION.BOTTOM_RIGHT,className: 'negetive-toast'});

                    }
                })

            
        }else{
            toast.warning('لطفا یک گزینه را انتخاب کنید',{position: toast.POSITION.BOTTOM_RIGHT,className: 'warning-toast'});

        }

    }


    useEffect(getUserByPUA,[])
    return(
        <div className="pghlf">
            <ToastContainer autoClose={3000} />
            <section>
                <h2>تعرفه ها</h2>
                   <div className="pay">
                        <input checked={pay=='pay1'} onChange={(e)=>setPay(e.target.value)}  type='radio' name='termPlan' value='pay1' id='pay1'/>
                        <label htmlFor='pay1'>
                            <p>طرح تک برگ (یک ماهه)</p>
                            <div className='ticket ticket1'>
                                <h6>25,000 تومان</h6>
                                <div className='off'>
                                    <p></p>
                                    <span></span>
                                </div>
                                <div className='cut'>
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                </div>
                                <div className='perMonth'>
                                    <p></p>
                                    <span></span>
                                </div>
                            </div>
                        </label>
                        <input checked={pay=='pay2'} onChange={(e)=>setPay(e.target.value)} type='radio' name='termPlan' value='pay2' id='pay2'/>
                        <label htmlFor='pay2'>
                            <p>طرح دو برگ (دوماهه)</p>
                            <div className='ticket ticket2'>
                                <h6>50,000 تومان</h6>
                                <div className='off'>
                                    <p>15%</p>
                                    <span>تخفیف</span>
                                </div>
                                <div className='cut'>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                </div>
                                <div className='perMonth'>
                                    <p>تومان</p>
                                    <span>42,500</span>
                                </div>
                            </div>
                        </label>
                        <input checked={pay=='pay3'} onChange={(e)=>setPay(e.target.value)} type='radio' name='termPlan' value='pay3' id='pay3'/>
                        <label htmlFor='pay3'>
                            <p>طرح سه برگ (سه ماهه)</p>
                            <div className='ticket ticket3'>
                                <h6>75,000 تومان</h6>
                                <div className='off'>
                                    <p>25%</p>
                                    <span>تخفیف</span>
                                </div>
                                <div className='cut'>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                </div>
                                <div className='perMonth'>
                                    <p>تومان</p>
                                    <span>56,250</span>
                                </div>
                            </div>
                        </label>
                        <input checked={pay=='pay6'} onChange={(e)=>setPay(e.target.value)} type='radio' name='termPlan' value='pay6' id='pay6'/>
                        <label htmlFor='pay6'>
                            <p>طرح شش برگ (شش ماهه)</p>
                            <div className='ticket ticket6'>
                                <h6>150,000 تومان</h6>
                                <div className='off'>
                                    <p>40%</p>
                                    <span>تخفیف</span>
                                </div>
                                <div className='cut'>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                </div>
                                <div className='perMonth'>
                                    <p>تومان</p>
                                    <span>90,000</span>
                                </div>
                            </div>
                        </label>
                        <input checked={pay=='pay12'} onChange={(e)=>setPay(e.target.value)} type='radio' name='termPlan' value='pay12' id='pay12'/>
                        <label htmlFor='pay12'>
                            <p>طرح سال برگ (یکساله)</p>
                            <div className='ticket ticket12'>
                                <h6>300,000 تومان</h6>
                                <div className='off'>
                                    <p>50%</p>
                                    <span>تخفیف</span>
                                </div>
                                <div className='cut'>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                        <i></i>
                                </div>
                                <div className='perMonth'>
                                    <p>تومان</p>
                                    <span>150,000</span>
                                </div>
                            </div>
                        </label>
                    </div>
                <button onClick={applyProfile}>ثبت</button>
            </section>
            <img src="/img/loginVector.svg" />


        </div>
    )
}

export default Price