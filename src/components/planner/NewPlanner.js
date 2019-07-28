import {Component} from "react";
import React from "react";
import Paper from "@material-ui/core/Paper";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { createPlan } from "../../store/actions/planActions";
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";

class NewPlanner extends Component {

    state = {
        title: '',
        text: '',
        isImportant: false,
        summary: '',
        date: null
    };

    handleChange = (event) => {
        if (event.target.type === 'checkbox') {
            this.setState({
                [event.target.name]: !this.state[event.target.name]
            });
        } else {
            this.setState({
                [event.target.name]: event.target.value
            });
        }


    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.createPlan(this.state);
        this.props.history.push('/');
    };

    render() {

        const { auth } = this.props;

        if ( !auth.uid) return <Redirect to='/login' />;

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
                        <Grid item xs={12}>
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
                                            label="Title"
                                            onChange={this.handleChange}
                                            name="title"
                                            fullWidth
                                            value={this.state.title}
                                            validators={['required', 'minStringLength:5', 'maxStringLength:55']}
                                            errorMessages={['this field is required', 'min length is 5', 'max length is 55']}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextValidator
                                            label="Summary"
                                            onChange={this.handleChange}
                                            name="summary"
                                            multiline
                                            rows="3"
                                            fullWidth
                                            value={this.state.summary}
                                            validators={['required', 'minStringLength:5', 'maxStringLength:100']}
                                            errorMessages={['this field is required', 'min length is 5', 'max length is 100']}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextValidator
                                            label="Text"
                                            onChange={this.handleChange}
                                            name="text"
                                            multiline
                                            rows="6"
                                            fullWidth
                                            value={this.state.text}
                                            validators={['required', 'minStringLength:10', 'maxStringLength:255']}
                                            errorMessages={['this field is required', 'min length is 10', 'max length is 255']}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <p>Is important event?
                                            <Switch
                                                checked={this.state.isImportant}
                                                onChange={this.handleChange}
                                                name="isImportant"
                                            />
                                        </p>
                                    </Grid>
                                    <Button type="submit">Submit</Button>
                                </Grid>
                            </ValidatorForm>
                        </Grid>
                    </Box>
                </Grid>
            </Paper>
        );
    }
}

const mapsStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        createPlan: (plan) => dispatch(createPlan(plan))
    }
};

export default connect(mapsStateToProps, mapDispatchToProps)(NewPlanner);