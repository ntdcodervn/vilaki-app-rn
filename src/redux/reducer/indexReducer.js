import personReducer from './personReducer'
import {combineReducers} from 'redux'

const indexReducer= combineReducers({
    person: personReducer
})
export default indexReducer