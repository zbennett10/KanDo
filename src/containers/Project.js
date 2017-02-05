import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTodo, updateDoing, moveTodo} from '../actions/index';
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
    hover(targetProps, monitor, targetComponent) {
        const sourceIndex = monitor.getItem().index;
        const targetIndex = targetProps.index;
        if(sourceIndex === targetIndex) return; //exit out of function if item is hovering over itself

        //get position of component
        const hoverRectangle = findDOMNode(targetComponent).getBoundingClientRect();
        const hoverMidY = (hoverRectangle.bottom - hoverRectangle.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverRectangle.top;

        //if project being dragged is before the target project and the mouse is above 50% of target project height then exit
        if(sourceIndex < targetIndex && hoverClientY < hoverMidY) return;
        //if project being dragged is after the target project and the mouse is lower than 50% of target project height then exit
        if(sourceIndex > targetIndex && hoverClientY > hoverMidY) return;

        console.log(targetProps);
        //this is where we will call action that moves projects and switches index properties of projects
        moveTodo({
            sourceIndex: sourceIndex,
            targetIndex: targetIndex
        });
    },

    drop(targetProps, monitor) {
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
                workspace: this.props.workspace
            });
            this.setState({isModalOpen: false});
            break;
            case 'doing':
            this.props.updateDoing({
                title: this.refs.projectTitle.value ? this.refs.projectTitle.value : this.props.title, //if user enters new value - replace old project title. else old project title
                id: this.props.id,
                desc: this.refs.projectDesc.value,
                index: this.props.index,
                workspace: this.props.workspace
            });
            this.setState({isModalOpen: false});
            break;
            default:
                return;
        }
    }

    render() {
        //connect react dnd props to container on component render
        const {isDragging, connectDragSource, connectDropTarget} = this.props;

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
    return bindActionCreators({ updateTodo, updateDoing, moveTodo}, dispatch);
}

//use compose to implement redux connect and react-dnd decorator
export default compose(
    DragSource(ItemTypes.PROJECT, projectDragSource, collectDrag),
    DropTarget(ItemTypes.PROJECT, projectDragTarget, collectDrop),
connect(null, mapDispatchToProps))(Project);