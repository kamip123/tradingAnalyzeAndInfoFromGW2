import {Component} from "react";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {signOut} from "../../store/actions/authActions";
import {connect} from "react-redux";

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
};

class LogOut extends Component {
    componentDidMount() {
        this.props.signOut();
    }

    render() {
        return (
            <Paper>
                <Box p={2}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={1}
                    >
                        <p>You have been logged out</p>
                    </Grid>
                </Box>
            </Paper>
        );
    }
}

export default connect(null, mapDispatchToProps)(LogOut);