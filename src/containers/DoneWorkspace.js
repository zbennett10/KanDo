import React, {Component} from 'react';

class DoneWorkspace extends Component {
    render() {
        return(
            <div className="col-lg-4 col-md-4">
                <h1 className="workspace-heading heading-offset">
                    Done
                </h1>   
                <label>Drag and Drop Finished Projects Here</label>
            </div>
        );
    };
}

export default DoneWorkspace;