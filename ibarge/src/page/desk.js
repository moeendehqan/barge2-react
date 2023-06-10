import Header from "../componets/header"
import HomeMenu from "../componets/HomeMenu"
import { Outlet } from "react-router-dom"
import Footer from "../componets/Footer"

const Desk = () =>{
    return(
        <div className="Home">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}


export default Desk