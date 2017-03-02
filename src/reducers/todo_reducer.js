import update from 'react-addons-update';

//import action that adds/removes or changes project here
import _ from 'lodash';

var todoStorage = JSON.parse(localStorage.getItem("_KandoTodo"));

export default function(state = todoStorage, action) {
    //action switch statement here (one for add, remove, update)
    switch(action.type) {
        case 'ADD_TODO':
            action.payload[0].index = state.length;
            setTodoStorage(state.concat(action.payload));
            return state.concat(action.payload);
        case 'DELETE_TODO': 
            let deleteState = state.slice();
            const deletedIndex = state.indexOf(state.find(project=>project.id===action.payload.id));
            deleteState.splice(deletedIndex,1);
            deleteState.forEach(project => project.index > deletedIndex ? project.index -= 1 : project.index); //for every value in state array that is at a later index than the deleted index, substract its index value by 1
            setTodoStorage(deleteState);
            return deleteState;
        case 'CLEAR_TODO':
            return action.payload;
        case 'UPDATE_TODO':
            let updatedIndex = state.indexOf(state.find(project=>project.id===action.payload.id)); //find index of project in state array
            let updateState = state.slice(); //create copy of current state
            updateState.splice(updatedIndex, 1, action.payload); //replace old project with new project
            setTodoStorage(updateState);
            return updateState;
        case 'MOVE_TODO_WITHIN':
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
            setTodoStorage(moveState);
            return moveState;
        default:
            return state;
    }
}


function setTodoStorage(state) {
    localStorage.setItem("_KandoTodo", JSON.stringify(state));
}