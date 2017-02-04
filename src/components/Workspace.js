import React, {Component} from 'react';
import TodoWorkspace from '../containers/TodoWorkspace';
import DoingWorkspace from '../containers/DoingWorkspace';
import DoneWorkspace from '../containers/DoneWorkspace';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

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

export default DragDropContext(HTML5Backend)(Workspace);
