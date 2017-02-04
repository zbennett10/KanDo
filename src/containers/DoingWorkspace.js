import React, {Component} from 'react';
import Project from './Project';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addDoing, clearDoing, updateDoing} from '../actions/index';

import {modalStyle} from '../App.js';
import Modal from 'react-modal';

class DoingWorkspace extends Component {
    constructor(props) {
        super(props);
        this.onWorkspaceClear = this.onWorkspaceClear.bind(this);
        this.onOpenAddModal = this.onOpenAddModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onAddProject = this.onAddProject.bind(this);

        this.state = {
            addModalOpen: false
        }
    }

    onWorkspaceClear(event) {
        this.props.clearDoing();
    }

    onOpenAddModal(event) {
        this.setState({addModalOpen: true});
    }

    closeModal() {
        this.setState({addModalOpen: false});
    }

    onAddProject() {
        let projectTitle = this.refs.projectTitle.value;
        this.props.addDoing({
            title: projectTitle
        });
        this.setState({addModalOpen: false});
    }

    render() {
        return(
            <div className="col-lg-4 col-md-4">
                <h1 className="workspace-heading">
                    Doing
                </h1>
                <button className="btn btn-sm btn-danger"
                    onClick={this.onWorkspaceClear}>
                Clear</button>
                <div>
                    {this.props.doingProjects.map(project => {
                        return <Project key={project.title} 
                                        title={project.title}
                                        workspace="doing"/>
                    }).concat(<button className="btn-add btn btn-sm btn-success"
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
    return {doingProjects: state.doingProjects}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addDoing, clearDoing}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DoingWorkspace);