import _ from 'lodash';

//if this is the user's first time entering the website
//keep this here for now until figure out how to drop on empty done workspace
if(!localStorage._KandoDone) {
    var initialDone= [
        {
            title: 'DoneProject',
            id: 4545545,
            desc: "Done.",
            index: 0
        }
    ];

    setDoneStorage(initialDone);
}


var doneStorage = JSON.parse(localStorage.getItem("_KandoDone"));




export default function(state = doneStorage, action) {
    //action switch statement here (one for add, remove, update)
    switch(action.type) {
        case 'ADD_DONE':
            action.payload[0].index = state.length;
            setDoneStorage(state.concat(action.payload));
            return state.concat(action.payload);
        case 'DELETE_DONE': 
            let deleteState = state.slice();
            const deletedIndex = state.indexOf(state.find(project=>project.id===action.payload.id));
            deleteState.splice(deletedIndex,1);
            deleteState.forEach(project => project.index > deletedIndex ? project.index -= 1 : project.index); //for every value in state array that is at a later index than the deleted index, substract its index value by 1
            setDoneStorage(deleteState);
            return deleteState;
        case 'CLEAR_DONE':
            return action.payload;
        case 'UPDATE_DONE':
            let updatedIndex = state.indexOf(state.find(project=>project.id===action.payload.id)); //find index of project in state array
            let updateState = state.slice(); //create copy of current state
            updateState.splice(updatedIndex, 1, action.payload); //replace old project with new project
            setDoneStorage(updateState);
            return updateState;
        case 'MOVE_DONE_WITHIN':
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
            setDoneStorage(moveState);
            return moveState;
        default:
            return state;
    }
}

function setDoneStorage(state) {
    localStorage.setItem("_KandoDone", JSON.stringify(state));
}