import _ from 'lodash';

var initialTodo = [
    {
        title: 'DoneProject',
        id: _.uniqueId(),
        desc: "Done.",
        index: 0
    }
];




export default function(state = initialTodo, action) {
    //action switch statement here (one for add, remove, update)
    switch(action.type) {
        case 'ADD_DONE':
            return state.concat(action.payload);
        case 'DELETE_DONE': 
            let deleteState = state.slice();
            const deletedIndex = state.indexOf(state.find(project=>project.id===action.payload.id));
            deleteState.splice(deletedIndex,1);
            deleteState.forEach(project => project.index > deletedIndex ? project.index -= 1 : project.index); //for every value in state array that is at a later index than the deleted index, substract its index value by 1
            return deleteState;
        case 'CLEAR_DONE':
            return action.payload;
        case 'UPDATE_DONE':
            let updatedIndex = state.indexOf(state.find(project=>project.id===action.payload.id)); //find index of project in state array
            let updateState = state.slice(); //create copy of current state
            updateState.splice(updatedIndex, 1, action.payload); //replace old project with new project
            return updateState;
        case 'MOVE_DONE':
            return state;
        default:
            return state;
    }
}