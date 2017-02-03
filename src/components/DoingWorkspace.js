import React, {Component} from 'react';
import Project from './Project';

class DoingWorkspace extends Component {
    render() {
        return(
            <div className="workspace">
            <table className="table">
                <thead>
                    <tr>
                        <th className="info">Doing</th>
                    </tr>
                </thead>
                <tbody>
                    <Project/>
                    <Project/>
                </tbody>
            </table>
            </div>
        );
    };
}

export default DoingWorkspace;