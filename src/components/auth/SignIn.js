import {Component} from "react";
import React from "react";
import Paper from "@material-ui/core/Paper";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {signIn} from "../../store/actions/authActions";
import {connect} from 'react-redux'
import {Redirect} from "react-router-dom";

class SignIn extends Component {

    state = {
        password: '',
        email: ''
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.signIn(this.state)
    };

    render() {
        const {error, auth} = this.props;

        if ( auth.uid) return <Redirect to='/' />;

        return (
            <Paper>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                >
                    <Box p={2}>
                        <Grid item sx={12}>
                            <ValidatorForm
                                onSubmit={this.handleSubmit}
                                onError={errors => console.log(errors)}
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <Grid item xs={12}>
                                        <TextValidator
                                            label="Email"
                                            onChange={this.handleChange}
                                            name="email"
                                            fullWidth
                                            value={this.state.email}
                                            validators={['required', 'isEmail']}
                                            errorMessages={['this field is required', 'this email is incorrect']}
                                        >
                                        </TextValidator>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextValidator
                                            label="Password"
                                            onChange={this.handleChange}
                                            name="password"
                                            type="password"
                                            fullWidth
                                            value={this.state.password}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                        >
                                        </TextValidator>
                                    </Grid>
                                    {
                                        error && (
                                            <Grid item xs={12}>
                                                <p> {error} </p>
                                            </Grid>
                                        )
                                    }
                                    <Button type="submit">Login</Button>
                                </Grid>
                            </ValidatorForm>
                        </Grid>
                    </Box>
                </Grid>
            </Paper>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
};

const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        auth: state.firebase.auth
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);