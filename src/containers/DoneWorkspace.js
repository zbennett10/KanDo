import React, {Component} from 'react';
import {addDone, clearDone, moveDoneWithin, doneToDoing, deleteDone, doneToTodo} from '../actions/index';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Project from './Project';

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
                })}
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