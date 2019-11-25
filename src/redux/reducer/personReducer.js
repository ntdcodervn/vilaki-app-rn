import {PERSON} from '../action/actionType'
const initialState = {
  movieData: null,
};


export default personReducer=(state = initialState, action)=>{
    switch(action.type){
        case PERSON: {
            return action.person
        }
        default:{
            return state
        }
    }
}