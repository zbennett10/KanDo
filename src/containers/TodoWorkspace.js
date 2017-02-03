import React, {Component} from 'react';
import Project from './Project';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addTodo, clearTodo} from '../actions/index';
import Modal from 'react-modal';


class TodoWorkspace extends Component {
    constructor(props) {
        super(props);
        this.onWorkspaceClear = this.onWorkspaceClear.bind(this);
        this.onOpenAddModal = this.onOpenAddModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.state = {
            addModalOpen: false
        }
    }

   

    onWorkspaceClear(event) {
        this.props.clearTodo();
    }

    onOpenAddModal(event) {
        this.setState({addModalOpen: true});
    }

    closeModal() {
        this.setState({addModalOpen: false});
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
                    }).concat(<button className="btn-add btn btn-sm btn-success"
                        onClick={this.onOpenAddModal}
                        >Add</button>)}
                </div>



                <Modal
                    isOpen={this.state.addModalOpen}
                    contentLabel="Modal"
    >
                    <h1>Modal Content</h1>
                    <p>Etc.</p>
                    <footer>
                        <button className="btn btm-lg btn-danger"
                            onClick={this.closeModal}>Close</button>
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
    return bindActionCreators({addTodo, clearTodo}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoWorkspace);