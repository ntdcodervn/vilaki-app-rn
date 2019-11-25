import {createStore} from 'redux'
import indexReducer from '../reducer/indexReducer'

export default configureStore=()=>{
    return createStore(indexReducer)
}