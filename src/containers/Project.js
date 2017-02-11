import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTodo, updateDoing, updateDone} from '../actions/index';
import {findDOMNode} from 'react-dom';
import _ from 'lodash';

//react dnd
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../dndItemTypes';
import {compose} from 'redux';

//modal imports
import Modal from 'react-modal';
import {modalStyle} from '../App.js';

//object that defines the project drag source
const projectDragSource = {
    beginDrag(props) {
        return Object.assign({}, props);
    },

    endDrag(props, monitor) {
        
    }
};

//object that defines the project drop target
const projectDragTarget = {
    //on project drop call action that realign project position in workspace state
    drop(targetProps, monitor) {
        const sourceProps = monitor.getItem();
        //moving todo projects within todo workspace
        if(targetProps.workspace === 'todo' && sourceProps.workspace === 'todo') {
            const sourceIndex = sourceProps.index;
            const targetIndex = targetProps.index;
            targetProps.moveTodoWithin({
                sourceIndex: sourceIndex,
                targetIndex: targetIndex
            });
            //moving todo projects to doing workspace
        } else if (targetProps.workspace === 'doing' && sourceProps.workspace ==='todo') {
            //if project limit has been reached return and don't drop
            if(targetProps.projectLimit <= targetProps.totalProjects) {
                return Object.assign({}, targetProps);
            } else {
                //update sourceProps workspace property to match the switch
                sourceProps.workspace = 'doing';
                sourceProps.todoToDoing(sourceProps);
                sourceProps.deleteTodo(sourceProps);
            }
            //moving todo projects to done workspace
        } else if (targetProps.workspace === 'done' && sourceProps.workspace === 'todo') {
            sourceProps.workspace = 'done';
            sourceProps.todoToDone(sourceProps);
            sourceProps.deleteTodo(sourceProps);
        }
        //moving doing project within doing workspace
        else if (targetProps.workspace === 'doing' && sourceProps.workspace === 'doing') {
            const sourceIndex = sourceProps.index;
            const targetIndex = targetProps.index;
            targetProps.moveDoingWithin({
                sourceIndex: sourceIndex,
                targetIndex: targetIndex
            });
        }
        //moving doing project to todo workspace
        else if (targetProps.workspace ==='todo' && sourceProps.workspace === 'doing') {
            sourceProps.doingToTodo(sourceProps);
            sourceProps.deleteDoing(sourceProps);
        } 
        //moving doing  project to done workspace
        else if (targetProps.workspace === 'done' && sourceProps.workspace === 'doing') {
            sourceProps.workspace = 'done';
            sourceProps.doingToDone(sourceProps);
            sourceProps.deleteDoing(sourceProps);
        }
        //moving done project to todo workspace
        else if(targetProps.workspace === 'todo' && sourceProps.workspace === 'done') {
            sourceProps.workspace = 'todo';
            sourceProps.doneToTodo(sourceProps);
            sourceProps.deleteDone(sourceProps);
        }
        //moving done project to doing workspace
        else if(targetProps.workspace === 'doing' && sourceProps.workspace === 'done') {
            if(targetProps.projectLimit <= targetProps.totalProjects) {
                return Object.assign({}, targetProps);
            } else {   
                sourceProps.workspace = 'doing';
                sourceProps.doneToDoing(sourceProps);
                sourceProps.deleteDone(sourceProps);
            }
        }

        //moving done project within another done project
        else if(targetProps.workspace === 'done' && sourceProps.workspace == 'done') {
            const sourceIndex = sourceProps.index;
            const targetIndex = targetProps.index;
            targetProps.moveDoneWithin({
                sourceIndex: sourceIndex,
                targetIndex: targetIndex
            });
        }

        return Object.assign({}, targetProps);
    }
}

//react dnd function that specifies props to inject into project container
function collectDrag(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

//function like the one above but for drop target
function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({shallow: true}),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
    }
}


class Project extends Component {    
    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onUpdateModal = this.onUpdateModal.bind(this);

        this.state = {
            isModalOpen : false
        }
    }

    openModal(event) {
        this.setState({isModalOpen: true});
        console.log(this.props.key, this.props.index);
    }

    closeModal() {
        this.setState({isModalOpen: false});
    }

    onUpdateModal() {
        //call action to change project state
        switch(this.props.workspace) {
            case 'todo':
                this.props.updateTodo({
                    title: this.refs.projectTitle.value ? this.refs.projectTitle.value : this.props.title, //if user enters new value - replace old project title. else old project title
                    id: this.props.id,
                    desc: this.refs.projectDesc.value,
                    index: this.props.index,
                    workspace: this.props.workspace,
                    moveTodoWithin: this.props.moveTodoWithin,
                    todoToDoing: this.props.todoToDoing,
                    todoToDone: this.props.todoToDone
                });
                this.setState({isModalOpen: false});
            break;
            case 'doing':
                this.props.updateDoing({
                    title: this.refs.projectTitle.value ? this.refs.projectTitle.value : this.props.title, //if user enters new value - replace old project title. else old project title
                    id: this.props.id,
                    desc: this.refs.projectDesc.value,
                    index: this.props.index,
                    workspace: this.props.workspace,
                    projectLimit: this.props.projectLimit,
                    totalProjects: this.props.totalProjects,
                    moveDoingWithin: this.props.moveDoingWithin,
                    doingToTodo: this.props.doingToTodo,
                    doingToDone: this.props.doingToDone,
                    deleteDoing: this.props.deleteDoing
                });
                this.setState({isModalOpen: false});
            break;
            case 'done':
                this.props.updateDone({
                    title: this.refs.projectTitle.value ? this.refs.projectTitle.value : this.props.title, //if user enters new value - replace old project title. else old project title
                    id: this.props.id,
                    desc: this.refs.projectDesc.value,
                    index: this.props.index,
                    workspace: this.props.workspace,
                    moveDoneWithin: this.props.moveDoneWithin,
                    doneToTodo: this.props.doneToTodo,
                    doneToDoing: this.props.doneToDoing,
                    deleteDone: this.props.deleteDone       
                });
                this.setState({isModalOpen: false});
            default:
                return;
        }
    }

    render() {
        //connect react dnd props to container on component render
        const {isDragging, connectDragSource, connectDropTarget,
                isOver, isOverCurrent} = this.props;

        //displays placeholder during hover
        if(this.props.isDragging || this.props.isOver) {
            return compose(connectDropTarget,connectDragSource)(<div className="card project">
                <div className="placeholder-card">
                    
            </div>
            </div>
            );
        }

        //wrap jsx being returned in drag source
        return compose(connectDropTarget,connectDragSource)(<div className="card project">
                <div className="card-block">
                    <h4 className="card-title">
                        <a href="#" className="btn btn-primary"
                            onClick={this.openModal}>
                            {this.props.title}
                        </a>
                    </h4>
                </div>


                <Modal
                    isOpen={this.state.isModalOpen}
                    contentLabel="Modal"
                    style={modalStyle}
    >
                    <h1>{this.props.title}</h1>               
                    <div className="form-group row">
                        <label htmlFor="project-title" className="col-2 col-form-label">Title</label>
                        <div className="col-10">
                            <input ref="projectTitle" className="form-control" 
                                   type="text" id="project-title" placeholder={this.props.title}
                                   maxLength="15" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="project-desc" className="col-2 col-form-label">Description</label>
                        <div className="col-10">
                            <textarea ref="projectDesc" className="form-control"
                                >{this.props.desc}</textarea>
                        </div>
                    </div>
                    

                    <footer>
                        <div className="btn-group">
                            <button className="btn btn-lg btn-danger"
                                onClick={this.closeModal}>Close</button>
                            <button className="btn btn-lg btn-success"
                                onClick={this.onUpdateModal}>Update</button>
                        </div>
                    </footer>
                </Modal>
            </div>
        
        );
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updateTodo, updateDoing, updateDone}, dispatch);
}

//use compose to implement redux connect and react-dnd decorator
export default compose(
    DragSource(ItemTypes.PROJECT, projectDragSource, collectDrag),
    DropTarget(ItemTypes.PROJECT, projectDragTarget, collectDrop),
connect(null, mapDispatchToProps))(Project);