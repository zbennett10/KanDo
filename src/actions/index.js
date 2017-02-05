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

export function updateTodo(project) {
    return {
        type: 'UPDATE_TODO',
        payload: project
    }
}

export function moveTodo(projectIndices) {
    return {
        type: 'MOVE_TODO',
        payload: projectIndices
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

