import axios from "axios"
import { getCookie } from "../../function/cookie"
import { OnRun } from "../../config/OnRun"
import { useEffect, useState } from "react"
import { ReactTabulator } from 'react-tabulator'



const Users = () =>{
    const cliadmin = getCookie('cliadmin')
    const [dfUsers, setDfUsers] = useState([])
    const columns = [
        { title: "Name", field: "name", width: 150 },
        { title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
        { title: "Favourite Color", field: "col" },
        { title: "Date Of Birth", field: "dob", hozAlign: "center" },
        { title: "Rating", field: "rating", hozAlign: "center", formatter: "star" },
        { title: "Passed?", field: "passed", hozAlign: "center", formatter: "tickCross" }
      ];
    const get = () =>{
        axios.post(OnRun+'/admin/getusers',{cliadmin:cliadmin})
        .then(response=>{
            if (response.data.reply) {
                setDfUsers(response.data.df)
            }
        })
    }

    useEffect(get,[])
    return(
        <div className="adminSubPg">
            {dfUsers.length==0?null:<ReactTabulator data={dfUsers} columns={columns} layout={"fitData"}/>}
        </div>
    )
}

export default Users