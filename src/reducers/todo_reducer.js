import update from 'react-addons-update';

//import action that adds/removes or changes project here
import _ from 'lodash';
var initialTodo = [
    {
        title: 'Project1',
        id: _.uniqueId(),
        desc: "This is project one.",
        index: 0
    },
    {
        title: 'Project2',
        id: _.uniqueId(),
        desc: "This is project two.",
        index: 1
    },
    {
        title: 'Project3',
        id: _.uniqueId(),
        desc: "This is project three.",
        index: 2
    }
]

export default function(state = initialTodo, action) {
    //action switch statement here (one for add, remove, update)
    switch(action.type) {
        case 'ADD_TODO':
            return state.concat(action.payload);
        case 'CLEAR_TODO':
            return action.payload;
        case 'UPDATE_TODO':
            let updatedIndex = state.indexOf(state.find(project=>project.id===action.payload.id)); //find index of project in state array
            let newState = state.slice(); //create copy of current state
            newState.splice(updatedIndex, 1, action.payload); //replace old project with new project
            return newState;
        case 'MOVE_TODO':
            //switch project positions here
            console.log('running move todo action');
            console.log(action.payload);
            return null;
        default:
            return state;
    }
}