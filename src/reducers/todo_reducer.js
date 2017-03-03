import update from 'react-addons-update';
import {List} from 'immutable';

//import action that adds/removes or changes project here
import _ from 'lodash';

Array.prototype.swapProp = function(obj1, obj2, prop) {
    let temp = obj1[prop];
    obj1[prop] = obj2[prop];
    obj2[prop] = temp;
}

var todoStorage = JSON.parse(localStorage.getItem("_KandoTodo"));

export default function(state = todoStorage, action) {
    switch(action.type) {
        case 'ADD_TODO':
            const addTodoState = List(state).push(action.payload).toJS();
            setTodoStorage(addTodoState);
            return addTodoState;
        case 'DELETE_TODO':
            const deleteTodoState = List(
                state.map(project => {
                    if(project.index > action.payload.index) {
                        project.index -= 1;
                    }
                    return project;
                })
            ).delete(action.payload.index).toJS();
            setTodoStorage(deleteTodoState);
            return deleteTodoState;
        case 'CLEAR_TODO':
            return action.payload;
        case 'UPDATE_TODO':
            const updatedIndex = state.indexOf(state.find(project=>project.id===action.payload.id)); //find index of project in state array
            const updateTodoState = List(state).set(updatedIndex, action.payload).toJS();
            setTodoStorage(updateTodoState);
            return updateTodoState;
        case 'MOVE_TODO_WITHIN':     
            const sourceProject = state[action.payload.sourceIndex];
            const targetProject = state[action.payload.targetIndex];
            Array.prototype.swapProp(sourceProject, targetProject, "index");
    
            const interimMoveState = List(state).set(action.payload.targetIndex, sourceProject);
            const finalMoveState = interimMoveState.set(action.payload.sourceIndex, targetProject).toJS();
            setTodoStorage(finalMoveState);
            return finalMoveState;
        default:
            return state;
    }
}


function setTodoStorage(state) {
    localStorage.setItem("_KandoTodo", JSON.stringify(state));
}
