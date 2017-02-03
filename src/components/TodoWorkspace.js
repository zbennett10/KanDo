import React, {Component} from 'react';
import Project from './Project';

class TodoWorkspace extends Component {
    render() {
        return(
            <div className="workspace">
            <table className="table">
                <thead>
                    <tr>
                        <th className="info">Todo</th>
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

export default TodoWorkspace;