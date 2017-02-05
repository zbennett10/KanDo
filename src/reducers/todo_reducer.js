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
            let updateState = state.slice(); //create copy of current state
            updateState.splice(updatedIndex, 1, action.payload); //replace old project with new project
            return updateState;
        case 'MOVE_TODO':
            //switch project positions here----- fix this code!
            //switch positions in state
            //switch indexes in projects
            let moveState = state.slice();
            const sourceProject = moveState[action.payload.sourceIndex];
            const targetProject = moveState[action.payload.targetIndex];
            let temp = sourceProject.index;
            sourceProject.index = targetProject.index;
            targetProject.index = temp;
            moveState.splice(action.payload.targetIndex, 1, sourceProject);
            moveState.splice(action.payload.sourceIndex, 1 , targetProject);
            console.log(moveState);
            // const targetProject = moveState.splice(action.payload.targetIndex, 1, moveState[action.payload.sourceIndex]);
            // moveState.splice(action.payload.sourceIndex, 1, targetProject);
            // console.log(targetProject, sourceProject);
            //moveState[action.payload.targetIndex] = moveState[action.payload.sourceIndex];
            //moveState[action.payload.sourceIndex] = targetProject;
            return moveState;
        default:
            return state;
    }
}