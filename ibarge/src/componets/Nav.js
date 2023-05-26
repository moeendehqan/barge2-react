import axios from "axios"
import { OnRun } from "../config/OnRun"

import { useEffect, useState } from "react"



const Nav = () =>{
    const [menu, setMenu] = useState([])

    useEffect(()=>{
        axios({method:'POST',url:OnRun+'/getmenu'
        }).then(response=>{
            
            setMenu(response.data)
        })
    },[])
    return(
        <nav>
            <ul>
                {
                    Object.keys(menu).map(i=>{

                        return(
                            <li key={i}>
                                <p>{i}</p>
                                <ul>
                                    {
                                        menu[i].map(j=>{
                                            return(
                                                <li key={j.url}>
                                                    <p>{j.title}</p>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                
                            </li>
                        )
                    })
                }
            </ul>
            

        </nav>
    )
}

export default Nav