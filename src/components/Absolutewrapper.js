
import React from 'react'



//MAKES THE CHILD ABSOLUTELY POSITION FOR URL CHANGE TRANSITION
const  Absolutewrapper=({children})=> {
    return (
        <div className="position-absolute w-100">
        {children}
    </div>
    )
}

export default Absolutewrapper
