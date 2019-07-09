import {Component} from "react";
import React from "react";
import Paper from "@material-ui/core/Paper";

class PlannerDetails extends Component {
    state = {
        id: null
    };

    componentDidMount() {
        let id = this.props.match.params.id
        this.setState({
            id: id
        })
    }

    render() {
        return (
            <Paper>
                Planner Details {this.state.id}
            </Paper>
        );
    }
}

export default PlannerDetails;