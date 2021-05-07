import { USER , DELETE, UPDATE } from "./types"

const initialState =  {
    isLoggedIn:false,
    userData : undefined
}

const userReducer = (state=initialState , action) => {

    switch(action.type){
        case USER : return { isLoggedIn: true , userData:action.payload }
        case DELETE : return { isLoggedIn: false, userData:null }
        case UPDATE : return { ...state , userData:action.payload }
        default: return state
      
    }
}


export default userReducer

