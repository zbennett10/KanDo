import React, {Component} from 'react';

import Modal from 'react-modal';
import {modalStyle} from '../App.js';

class Project extends Component {
    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

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
                            <input ref="projectTitle" className="form-control" type="text" id="project-title"/>
                        </div>
                    </div>
                    

                    <footer>
                        <div className="btn-group">
                            <button className="btn btn-lg btn-danger"
                                onClick={this.closeModal}>Close</button>
                            <button className="btn btn-lg btn-success"
                                onClick={null}>Add</button>
                        </div>
                    </footer>
                </Modal>
            </div>
        );
    };
}

export default Project;