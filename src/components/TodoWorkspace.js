import React, {Component} from 'react';
import Project from './Project';

class TodoWorkspace extends Component {
    render() {
        return(
            <div className="col-lg-4 col-md-4">
                <h1 className="workspace-heading">
                    Todo
                </h1>
                <Project/>
            </div>
        );
    };
}

export default TodoWorkspace;