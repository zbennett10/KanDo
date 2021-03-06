import React, {Component} from 'react';
import Project from './Project';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {bindActionCreators} from 'redux';
import {addDoing, clearDoing, moveDoingWithin, doingToTodo, deleteDoing, doingToDone} from '../actions/index';
import _ from 'lodash';

import {modalStyle} from '../App.js';
import Modal from 'react-modal';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

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

class DoingWorkspace extends Component {
    constructor(props) {
        super(props);
        this.onWorkspaceClear = this.onWorkspaceClear.bind(this);
        this.onOpenAddModal = this.onOpenAddModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onAddProject = this.onAddProject.bind(this);
        this.onAdjustProjectLimit = this.onAdjustProjectLimit.bind(this);

        this.state = {
            addModalOpen: false,
            projectLimit: 2
        }
    }

    onWorkspaceClear(event) {
        this.props.clearDoing();
    }

    onOpenAddModal(event) {
        this.props.doingProjects.length < this.state.projectLimit ? this.setState({addModalOpen: true}) : null;
    }

    closeModal() {
        this.setState({addModalOpen: false});
    }

    onAddProject() {
        let projectTitle = this.refs.projectTitle.value;
        let projectDesc = this.refs.projectDesc.value;
        this.props.addDoing({
            title: projectTitle,
            id: _.uniqueId(),
            desc: projectDesc,
            workspace: 'doing',
            index: this.props.doingProjects.length,
            projectLimit: this.state.projectLimit,
            totalProjects: this.props.doingProjects.length,
            moveDoingWithin: this.props.moveDoingWithin,
            doingToTodo: this.props.doingToTodo,
            doingToDone: this.props.doingToDone,
            deleteDoing: this.props.deleteDoing
        });
        this.setState({addModalOpen: false});
    }

    onAdjustProjectLimit(value) {
        this.setState({projectLimit: value});
    }


    render() {
        const {connectDropTarget} = this.props;
        return(
            <div className="col-lg-4 col-md-4">
                <div className="slider-container">
                    <Slider ref="projectSlider" min={1} max={4} step={1}
                        value={this.state.projectLimit}
                        onChange={this.onAdjustProjectLimit}/>
                </div>
                <h1 className="workspace-heading">
                    Doing
                </h1>
                
                <button className="btn btn-sm btn-danger"
                    onClick={this.onWorkspaceClear}>
                Clear</button>
                <div>
                    {this.props.doingProjects.map(project => {
                        return <Project key={project.id}
                                        id={project.id}
                                        title={project.title}
                                        desc={project.desc}
                                        workspace="doing"
                                        index={project.index}
                                        projectLimit={this.state.projectLimit}
                                        totalProjects={this.props.doingProjects.length}
                                        moveDoingWithin={this.props.moveDoingWithin}
                                        doingToTodo={this.props.doingToTodo}
                                        doingToDone={this.props.doingToDone}
                                        deleteDoing={this.props.deleteDoing}/>
                    }).concat(<button key="addDoingButton" className="btn-add btn btn-sm btn-success"
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
    return {doingProjects: state.doingProjects}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addDoing, clearDoing, moveDoingWithin, doingToTodo, deleteDoing, doingToDone}, dispatch);
}


export default compose(
    DropTarget(ItemTypes.PROJECT, projectDragTarget, collectDrop),
connect(mapStateToProps, mapDispatchToProps))(DoingWorkspace);