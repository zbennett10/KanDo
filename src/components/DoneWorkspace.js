import React, {Component} from 'react';
import Project from './Project';

class DoneWorkspace extends Component {
    render() {
        return(
            <div className="workspace">
            <table className="table">
                <thead>
                    <tr>
                        <th className="info">Done</th>
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

export default DoneWorkspace;