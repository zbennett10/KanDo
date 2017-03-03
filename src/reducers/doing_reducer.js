import _ from 'lodash';

var doingStorage = JSON.parse(localStorage.getItem("_KandoDoing")) || [];


export default function(state = doingStorage, action) {
    //action switch statement here (one for add, remove, update)
    switch(action.type) {
        case 'ADD_DOING':
            action.payload[0].index = state.length;
            setDoingStorage(state.concat(action.payload));
            return state.concat(action.payload);
        case 'DELETE_DOING':
            let deleteState = state.slice();
            const deletedIndex = state.indexOf(state.find(project=>project.id===action.payload.id));
            deleteState.splice(deletedIndex,1);
            deleteState.forEach(project => project.index > deletedIndex ? project.index -= 1 : project.index); //for every value in state array that is at a later index than the deleted index, substract its index value by 1
            setDoingStorage(deleteState);
            return deleteState;
        case 'CLEAR_DOING':
            return action.payload;
        case 'UPDATE_DOING':
            let updatedIndex = state.indexOf(state.find(project=>project.id===action.payload.id)); //find index of project in state array
            let newState = state.slice(); //create copy of current state
            newState.splice(updatedIndex, 1, action.payload); //replace old project with new project
            setDoingStorage(newState);
            return newState;
        case 'MOVE_DOING_WITHIN':
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
            setDoingStorage(moveState);
            return moveState;
        default:
            return state;
    }
}

function setDoingStorage(state) {
    localStorage.setItem("_KandoDoing", JSON.stringify(state));
}