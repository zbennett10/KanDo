
export default function(state = [], action) {
    //action switch statement here (one for add, remove, update)
    switch(action.type) {
        case 'ADD_DOING':
            return state.concat(action.payload);
            break;
        case 'CLEAR_DOING':
            return action.payload;
            break;
    }
    return state;
}