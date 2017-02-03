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


//done workspace