import React, {Component} from 'react';

class Project extends Component {
    render() {
        return(
            <div className="card project">
                <div className="card-block">
                    <h4 className="card-title">
                        <a href="#" className="btn btn-primary">
                            {this.props.title}
                        </a>
                    </h4>
                </div>
            </div>
        );
    };
}

export default Project;