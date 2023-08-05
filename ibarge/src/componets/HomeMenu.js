import axios from "axios"
import { useEffect, useState } from "react"
import { OnRun } from "../config/OnRun"
import { useNavigate } from "react-router-dom"
import Loader from "../componets/loader"




const HomeMenu = () =>{
    const [menu, setMenu] = useState([])
    const [menuLoad, setMenuLoad] = useState([1,2,3,4,5,6,7,8,9,10,11])
    const [loaderActiv, setLoaderActive] =useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        axios({method:'POST',url:OnRun+'/gethomemenu'
        }).then(response=>{
            setMenu(response.data)
            setLoaderActive(false)
        })
    },[])

    return(
        <main>
            <Loader active={loaderActiv} />
            <div className="homeMenu">

                {
                    menu.length>0?
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
                    :
                    menuLoad.map(i=>{
                        return(
                            <div className="itemMenu">
                                <div className="circleLoad" >
                                </div>
                            </div>
                        )
                    })
                }

            </div>

        </main>
    )
}

export default HomeMenu