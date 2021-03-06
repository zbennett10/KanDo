import React, {Component} from 'react';
import Project from './Project';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addTodo, clearTodo, moveTodoWithin, todoToDoing, deleteTodo, todoToDone} from '../actions/index';
import Modal from 'react-modal';
import {modalStyle} from '../App.js';
import _ from 'lodash';

class TodoWorkspace extends Component {
    constructor(props) {
        super(props);
        this.onWorkspaceClear = this.onWorkspaceClear.bind(this);
        this.onOpenAddModal = this.onOpenAddModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onAddProject = this.onAddProject.bind(this);
        this.onDeleteProject = this.onDeleteProject.bind(this);

        this.state = {
            addModalOpen: false
        }
    }

    onWorkspaceClear(event) {
        this.props.clearTodo();
    }

    onDeleteProject(projectID) {
        const projectToDelete = this.props.todoProjects.find(project => project.id === projectID);
        this.props.deleteTodo(projectToDelete);
    }

    onOpenAddModal(event) {
        this.setState({addModalOpen: true});
    }

    closeModal() {
        this.setState({addModalOpen: false});
    }

    onAddProject() {
        let projectTitle = this.refs.projectTitle.value;
        let projectDesc = this.refs.projectDesc.value;
        this.props.addTodo({
            title: projectTitle,
            key: _.random(1000000),
            id: _.random(1000000),
            desc: projectDesc,
            workspace: 'todo',
            index: this.props.todoProjects.length,
            moveTodoWithin: this.props.moveTodoWithin,
            todoToDoing: this.props.todoToDoing,
            todoToDone: this.props.todoToDone,
            deleteTodo: this.props.deleteTodo
        });
        this.setState({addModalOpen: false});
    }

    render() {
        return(
            <div className="col-lg-4 col-md-4">
                <h1 className="workspace-heading heading-offset">
                    Todo
                </h1>
                <button className="btn btn-sm btn-danger"
                    onClick={this.onWorkspaceClear}>
                Clear</button>
                <div>
                    {this.props.todoProjects.map(project => {
                        return <Project key={project.key}
                                        id={project.id}
                                        title={project.title}
                                        desc={project.desc}
                                        index={project.index}
                                        workspace="todo"
                                        onDeleteProject={this.onDeleteProject}
                                        moveTodoWithin={this.props.moveTodoWithin}
                                        todoToDoing={this.props.todoToDoing}
                                        deleteTodo={this.props.deleteTodo}
                                        todoToDone={this.props.todoToDone}/>
                    }).concat(<button key="addTodoButton" className="btn-add btn btn-sm btn-success"
                        onClick={this.onOpenAddModal}
                        >Add</button>)}
                </div>



                <Modal
                    isOpen={this.state.addModalOpen}
                    contentLabel="Modal"
                    style={modalStyle}
    >
                    <h1>Add Project</h1>               
                    <div className="form-group row">
                        <label htmlFor="project-title" className="col-2 col-form-label">Title</label>
                        <div className="col-10">
                            <input ref="projectTitle" className="form-control" 
                                   type="text" id="project-title"
                                   maxLength="15"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="project-desc" className="col-2 col-form-label">Description</label>
                        <div className="col-10">
                            <textarea ref="projectDesc" className="form-control"
                                 placeholder="Describe your project"></textarea>
                        </div>
                    </div>
                    

                    <footer>
                        <div className="btn-group">
                            <button className="btn btn-lg btn-danger"
                                onClick={this.closeModal}>Close</button>
                            <button className="btn btn-lg btn-success"
                                onClick={this.onAddProject}>Add</button>
                        </div>
                    </footer>
                </Modal>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {todoProjects: state.todoProjects}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addTodo, clearTodo, moveTodoWithin, 
            todoToDone, todoToDoing, deleteTodo}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoWorkspace);
