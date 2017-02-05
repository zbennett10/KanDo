import React, {Component} from 'react';
import {moveDone} from '../actions/index';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';

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
    render() {
        return(
            <div className="col-lg-4 col-md-4">
                <h1 className="workspace-heading heading-offset">
                    Done
                </h1>   
                <label>Drag and Drop Finished Projects Here</label>
            </div>
        );
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({moveDone}, dispatch);
}

export default compose(
    DropTarget(ItemTypes.PROJECT, projectDragTarget, collectDrop),
connect(null, mapDispatchToProps))(DoneWorkspace);