import Header from "../componets/header"
import HomeMenu from "../componets/HomeMenu"
import { Outlet } from "react-router-dom"

const Desk = () =>{
    return(
        <div className="Home">
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}


export default Desk