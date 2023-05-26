import axios from "axios"
import { useEffect, useState } from "react"
import { OnRun } from "../config/OnRun"
import { useNavigate } from "react-router-dom"




const HomeMenu = () =>{
    const [menu, setMenu] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        axios({method:'POST',url:OnRun+'/gethomemenu'
        }).then(response=>{
            setMenu(response.data)
        })
    },[])

    return(
        <main>
            <div className="homeMenu">
                {
                    menu.map(i=>{

                        return(
                            <div className="itemMenu">
                                <div className="circle" onClick={()=>navigate("/desk/"+i.url)}>
                                    <img src={"./icon/page/"+i.url+".svg"}/>
                                    <h3>{i.title}</h3>
                                </div>
                                <p>{i.caption}</p>
                                
                            </div>
                        )
                    })
                }

            </div>

        </main>
    )
}

export default HomeMenu