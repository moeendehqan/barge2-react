
const MsgInPage = (props) =>{

    if (props.msg!='') {
        return(
            <div onClick={()=>{props.set('')}} className="msgInPage">
                <p >{props.msg}</p>
            </div>

        
            )
    }

}

export default MsgInPage