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



//done workspace