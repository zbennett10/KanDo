//import action that adds/removes or changes project here
var initialTodo = [
    {
        title: 'Project1'
    },
    {
        title: 'Project2'
    },
    {
        title: 'Project3'
    }
]

export default function(state = initialTodo, action) {
    //action switch statement here (one for add, remove, update)
    switch(action.type) {
        case 'ADD_TODO':
            //return new state with added project
        break;
        case 'CLEAR_TODO':
            console.log('running action');
            return action.payload;
        break;
    }
    return state;
}