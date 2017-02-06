//todo workspace
export function addTodo(project) {
    //add todo here
    return {
        type: 'ADD_TODO',
        payload: [project]
    }
}

export function clearTodo() {
    return {
        type: 'CLEAR_TODO',
        payload: []
    }
}

export function deleteTodo(project) {
    return {
        type: 'DELETE_TODO',
        payload: project
    }
}

export function updateTodo(project) {
    return {
        type: 'UPDATE_TODO',
        payload: project
    }
}

export function moveTodoWithin(projectIndices) {
    return {
        type: 'MOVE_TODO_WITHIN',
        payload: projectIndices
    }
}

export function todoToDoing(project) { // use redux thunk to return add doing action - transfer project to be added        //also remove todo project from todoprojects state
    return (dispatch, getState) => {
        dispatch({
            type: 'ADD_DOING',
            payload: [project]
        })
    }
}

export function todoToDone(project) {
    return (dispatch) => {
        dispatch({
            type: 'ADD_DONE',
            payload: [project]
        })
    }
}

//doing workspace ---------------------------------------------------

export function addDoing(project) {
    return {
        type: 'ADD_DOING',
        payload: [project]
    }
}

export function clearDoing() {
    return {
        type: 'CLEAR_DOING',
        payload: []
    }
}

export function updateDoing(project) {
    return {
        type: 'UPDATE_DOING',
        payload: project
    }
}

export function deleteDoing(project) {
    return {
        type: 'DELETE_DOING',
        payload: project
    }
}

export function moveDoingWithin(projectIndices) {
    return {
        type: 'MOVE_DOING_WITHIN',
        payload: projectIndices
    }
}

export function doingToTodo(project) { // use redux thunk to return add doing action - transfer project to be added        //also remove todo project from todoprojects state
    return (dispatch, getState) => {
        dispatch({
            type: 'ADD_TODO',
            payload: [project]
        })
    }
}

export function doingToDone(project) {
    return (dispatch) => {
        dispatch({
            type: 'ADD_DONE',
            payload: [project]
        })
    }
}


//done workspace-----------------------------------------------
export function moveDone(project) {
    return {
        type: 'MOVE_DONE',
        payload: project
    }
}

export function addDone(project) {
    //add todo here
    return {
        type: 'ADD_DONE',
        payload: [project]
    }
}

export function clearDone() {
    return {
        type: 'CLEAR_DONE',
        payload: []
    }
}

export function deleteDone(project) {
    return {
        type: 'DELETE_DONE',
        payload: project
    }
}

export function updateDone(project) {
    return {
        type: 'UPDATE_DONE',
        payload: project
    }
}

export function moveDoneWithin(projectIndices) {
    return {
        type: 'MOVE_DONE_WITHIN',
        payload: projectIndices
    }
}

export function doneToTodo(project) { // use redux thunk to return add doing action - transfer project to be added        //also remove todo project from todoprojects state
    return (dispatch, getState) => {
        dispatch({
            type: 'ADD_TODO',
            payload: [project]
        })
    }
}

export function doneToDoing(project) {
    return (dispatch) => {
        dispatch({
            type: 'ADD_DOING',
            payload: [project]
        })
    }
}

//project container

