import { combineReducers } from 'redux';
import TodoReducer from './todo_reducer';
import DoingReducer from './doing_reducer';
import DoneReducer from './done_reducer';

const rootReducer = combineReducers({
  todoProjects: TodoReducer,
  doingProjects: DoingReducer,
  doneProjects: DoneReducer
});

export default rootReducer;
