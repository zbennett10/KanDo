import React, {Component} from 'react';
import Project from './Project';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addTodo, clearTodo} from '../actions/index';


class TodoWorkspace extends Component {
    constructor(props) {
        super(props);
        this.onWorkspaceClear = this.onWorkspaceClear.bind(this);
    }

    onWorkspaceClear(event) {
        this.props.clearTodo();
    }

    render() {
        return(
            <div className="col-lg-4 col-md-4">
                <h1 className="workspace-heading">
                    Todo
                </h1>
                <button className="btn btn-sm btn-danger"
                    onClick={this.onWorkspaceClear}>
                Clear</button>
                <div>
                    {this.props.todoProjects.map(project => {
                        return <Project key={project.title} title={project.title}/>
                    })}
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {todoProjects: state.todoProjects}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addTodo, clearTodo}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoWorkspace);