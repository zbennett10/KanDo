//import action that adds/removes or changes project here
import _ from 'lodash';
var initialTodo = [
    {
        title: 'Project1',
        id: _.uniqueId()
    },
    {
        title: 'Project2',
        id: _.uniqueId()
    },
    {
        title: 'Project3',
        id: _.uniqueId()
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
            let updatedIndex = state.indexOf(state.find(project=>project.id===action.payload.id));
            let newState = state.slice();
            newState.splice(updatedIndex, 1, action.payload);
            return newState;//replace old project with new project here;
        default:
            return state;
    }
}