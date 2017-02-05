
export default function(state = [], action) {
    //action switch statement here (one for add, remove, update)
    switch(action.type) {
        case 'MOVE_DONE':
            return state;
        default:
            return state;
    }
}