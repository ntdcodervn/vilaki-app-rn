import {PERSON} from './actionType'

export const checkPersonAction=(person)=>{
    return {
        type: PERSON,
        person: person
    }
}
