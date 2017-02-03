//import action that adds/removes or changes project here
import {ADD_TODO} from '../actions/index';

export default function(state = [], action) {
    //action switch statement here (one for add, remove, update)
    switch(action.type) {
        case 'ADD_TODO':
        return [];
    }
    return state;
}