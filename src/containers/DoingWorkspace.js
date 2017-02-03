import React, {Component} from 'react';
import Project from './Project';

class DoingWorkspace extends Component {
    render() {
        return(
            <div className="col-lg-4 col-md-4">
                <h1 className="workspace-heading">
                    Doing
                </h1>
                <Project/>
            </div>
        );
    };
}

export default DoingWorkspace;