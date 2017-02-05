
export default function(state = [], action) {
    //action switch statement here (one for add, remove, update)
    switch(action.type) {
        case 'ADD_DOING':
            return state.concat(action.payload);
        case 'CLEAR_DOING':
            return action.payload;
        case 'UPDATE_DOING':
            let updatedIndex = state.indexOf(state.find(project=>project.id===action.payload.id)); //find index of project in state array
            let newState = state.slice(); //create copy of current state
            newState.splice(updatedIndex, 1, action.payload); //replace old project with new project
            return newState;
        default:
            return state;
    }
}