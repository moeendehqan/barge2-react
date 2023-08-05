



const Loader = (props) =>{

    if (props.active===true) {
        return(
            <div className="loader">
                <div className="logoMotion">
                    <img src={process.env.PUBLIC_URL+'/img/barge.png'}></img>
                    <img src={process.env.PUBLIC_URL+'/img/mll1.png'}></img>
                    <img src={process.env.PUBLIC_URL+'/img/mll2.png'}></img>
                    <img src={process.env.PUBLIC_URL+'/img/mll3.png'}></img>
                    <img src={process.env.PUBLIC_URL+'/img/mll4.png'}></img>
                </div>
                <h4>لطفا صبر کنید...</h4>
            </div>
        )
    }
}

export default Loader