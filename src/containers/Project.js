import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTodo, updateDoing} from '../actions/index';
import _ from 'lodash';

import Modal from 'react-modal';
import {modalStyle} from '../App.js';

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
        if(this.props.workspace === 'todo') {
            this.props.updateTodo({
                title: this.refs.projectTitle.value,
                id: this.props.id
            });
            this.setState({isModalOpen: false});
        }
        
    }

    render() {
        return(
            <div className="card project">
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
                                   type="text" id="project-title"
                                   maxLength="15"/>
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

export default connect(null, mapDispatchToProps)(Project);