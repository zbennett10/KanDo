//todo workspace
export function addTodo() {
    //add todo here
    return {
        type: 'ADD_TODO',
        payload: [{
            title: 'New Project'
        }]
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