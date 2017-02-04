import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTodo, updateDoing} from '../actions/index';
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
        console.log('dragging project', props);
        return {};
    }
};

//react dnd function that specifies props to inject into project container
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
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
                desc: this.refs.projectDesc.value
            });
            this.setState({isModalOpen: false});
            break;
            case 'doing':
            this.props.updateDoing({
                title: this.refs.projectTitle.value ? this.refs.projectTitle.value : this.props.title, //if user enters new value - replace old project title. else old project title
                id: this.props.id,
                desc: this.refs.projectDesc.value
            });
            this.setState({isModalOpen: false});
            break;
            default:
                return;
        }
    }

    render() {
        //connect react dnd props to container on component render
        const {isDragging, connectDragSource} = this.props;

        //wrap jsx being returned in drag source
        return connectDragSource(<div className="card project">
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
                                row={5} 
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
    return bindActionCreators({ updateTodo, updateDoing}, dispatch);
}

//use compose to implement redux connect and react-dnd decorator
export default compose(
    DragSource(ItemTypes.TODO_PROJECT, projectDragSource, collect),
connect(null, mapDispatchToProps))(Project);