import React, {Component} from 'react';
import TodoWorkspace from '../containers/TodoWorkspace';
import DoingWorkspace from '../containers/DoingWorkspace';
import DoneWorkspace from '../containers/DoneWorkspace';



class Workspace extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="row text-center">
                <TodoWorkspace />
                <DoingWorkspace />
                <DoneWorkspace />
            </div>
        );
    };
}

export default Workspace;