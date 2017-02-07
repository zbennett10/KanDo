import React, {Component} from 'react';
import {addDone, clearDone, moveDoneWithin, doneToDoing, deleteDone, doneToTodo} from '../actions/index';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Project from './Project';
import _ from 'lodash';

import {modalStyle} from '../App.js';
import Modal from 'react-modal';

//react dnd
import {DropTarget} from 'react-dnd';
import ItemTypes from '../dndItemTypes';

const projectDragTarget = {
    drop(targetProps, monitor) {
        return Object.assign({}, targetProps);
    }
}

function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({shallow: true}),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
    }
}


class DoneWorkspace extends Component {
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
        this.props.clearDone();
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
        this.props.addDone({
            title: projectTitle,
            id: _.uniqueId(),
            desc: projectDesc,
            workspace: 'done',
            index: this.props.doneProjects.length,
            totalProjects: this.props.doneProjects.length,
            moveDoneWithin: this.props.moveDoneWithin,
            doneToTodo: this.props.doneToTodo,
            doneToDoing: this.props.doneToDoing,
            deleteDone: this.props.deleteDone
        });
        this.setState({addModalOpen: false});
    }

    render() {
         const {connectDropTarget} = this.props;

        if(this.props.doneProjects.length < 1) {
            return compose(connectDropTarget)(
                <div className="col-lg-4 col-md-4">
                    <h1 className="workspace-heading heading-offset">Done</h1>
                    <label> Drag and Drop Finished Projects Here</label>
                </div>
            );
        }
       

        return (
            <div className="col-lg-4 col-md-4">
                <h1 className="workspace-heading heading-offset">
                    Done
                </h1>
                <button className="btn btn-sm btn-danger"
                    onClick={this.onWorkspaceClear}>
                Clear</button>
                <div>
                    {this.props.doneProjects.map(project => {
                        return <Project key={project.id}
                                        id={project.id}
                                        title={project.title}
                                        desc={project.desc}
                                        workspace="done"
                                        index={project.index}
                                        totalProjects={this.props.doneProjects.length}
                                        moveDoneWithin={this.props.moveDoneWithin}
                                        doneToTodo={this.props.doneToTodo}
                                        doneToDoing={this.props.doneToDoing}
                                        deleteDone={this.props.deleteDone}/>
                    }).concat(<button key="addDoneButton" className="btn-add btn btn-sm btn-success"
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
    return {doneProjects: state.doneProjects};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addDone, clearDone, moveDoneWithin, doneToDoing, deleteDone, doneToTodo}, dispatch);
}

export default compose(
    DropTarget(ItemTypes.PROJECT, projectDragTarget, collectDrop),
connect(mapStateToProps, mapDispatchToProps))(DoneWorkspace);