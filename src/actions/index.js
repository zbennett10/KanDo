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

//doing workspace

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


//done workspace
export function moveDone(project) {
    return {
        type: 'MOVE_DONE',
        payload: project
    }
}





//project container

