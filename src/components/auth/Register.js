import {Component} from "react";
import React from "react";
import Paper from "@material-ui/core/Paper";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {connect} from 'react-redux'
import {signUp} from "../../store/actions/authActions";
import {Redirect} from "react-router-dom";

class Register extends Component {

    state = {
        password: '',
        passwordRepeat: '',
        email: '',
        nick: ''
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.signUp(this.state);
    };

    componentDidMount() {
        ValidatorForm.addValidationRule('passwordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
    }

    componentWillUnmount() {
        ValidatorForm.removeValidationRule('passwordMatch');
    }

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
                                        label="Nick"
                                        onChange={this.handleChange}
                                        name="nick"
                                        fullWidth
                                        value={this.state.nick}
                                        validators={['required', 'minStringLength:5', 'maxStringLength:55']}
                                        errorMessages={['this field is required', 'min length is 5', 'max length is 55']}
                                    >
                                    </TextValidator>
                                </Grid>
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
                                        validators={['required', 'matchRegexp:^.*[A-Z].*$', 'matchRegexp:^.*[a-z].*$', 'matchRegexp:^.*[0-9].*$', 'matchRegexp:^.{8,}$']}
                                        errorMessages={['this field is required', 'password must contain at least one upper case letter', 'password must contain at least one lower case letter', 'password must contain at least one digit', 'password must be at least 8 long']}
                                    >
                                    </TextValidator>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextValidator
                                        label="Repeat Password"
                                        onChange={this.handleChange}
                                        name="passwordRepeat"
                                        type="password"
                                        fullWidth
                                        value={this.state.passwordRepeat}
                                        validators={['required', 'passwordMatch', 'matchRegexp:^.*[A-Z].*$', 'matchRegexp:^.*[a-z].*$', 'matchRegexp:^.*[0-9].*$', 'matchRegexp:^.{8,}$']}
                                        errorMessages={['this field is required', 'passwords are not the same', 'password must contain at least one upper case letter', 'password must contain at least one lower case letter', 'password must contain at least one digit', 'password must be at least 8 long']}
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
                                <Button type="submit">Register</Button>
                            </Grid>
                        </ValidatorForm>
                    </Box>
                </Grid>
            </Paper>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (credentials) => dispatch(signUp(credentials))
    }
};

const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        auth: state.firebase.auth
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);