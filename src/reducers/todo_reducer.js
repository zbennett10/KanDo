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
    //action switch statement here (one for add, remove, update)
    switch(action.type) {
        case 'ADD_TODO':
            const newerState = List(state).push(action.payload);
            setTodoStorage(newerState.toJS());
            return newerState.toJS();
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
            const updatedIndex = state.indexOf(state.find(project=>project.id===action.payload.id)); //find index of project in state array
            const newState = List(state).set(updatedIndex, action.payload);
            setTodoStorage(newState.toJS());
            return newState;
        case 'MOVE_TODO_WITHIN':     
            const sourceProject = state[action.payload.sourceIndex];
            const targetProject = state[action.payload.targetIndex];
            Array.prototype.swapProp(sourceProject, targetProject, "index");
    
            const interimState = List(state).set(action.payload.targetIndex, sourceProject);
            const finalState = interimState.set(action.payload.sourceIndex, targetProject);
            setTodoStorage(finalState.toJS());
            return finalState.toJS();
        default:
            return state;
    }
}


function setTodoStorage(state) {
    localStorage.setItem("_KandoTodo", JSON.stringify(state));
}
