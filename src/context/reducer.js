import {REMOVE_USER,ADD_PRODUCT} from "./action.types"
export const initialState=null
export const reducer =(state,action) => {
    switch(action.type){
        case ADD_PRODUCT:
            return action.payload
        case REMOVE_USER:
            return null
        default:return state
    }
}



