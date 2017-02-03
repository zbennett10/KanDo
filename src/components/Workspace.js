import React, {Component} from 'react';
import TodoWorkspace from './TodoWorkspace';
import DoingWorkspace from './DoingWorkspace';
import DoneWorkspace from './DoneWorkspace';

class Workspace extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="workspace-main text-center">
                <TodoWorkspace  />
                <DoingWorkspace />
                <DoneWorkspace />
            </div>
        );
    };
}

export default Workspace;