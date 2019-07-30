import React, {Component} from "react"
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import {connect} from "react-redux";
import MenuIcon from '@material-ui/icons/Menu';
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import {Link, Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {changeEmail} from "../../store/actions/authActions";

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeEmail: (date) => dispatch(changeEmail(date))
    }
};

class EditEmail extends Component {

    state = {
        showList: false,
        newEmail: '',
        repeatNewEmail: '',
        password: ''
    };

    handleClick = () => {
        this.setState({
            showList: !this.state.showList
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.changeEmail(this.state);
    };

    componentDidMount() {
        ValidatorForm.addValidationRule('emailMatch', (value) => {
            if (value !== this.state.newEmail) {
                return false;
            }
            return true;
        });
    }

    componentWillUnmount() {
        ValidatorForm.removeValidationRule('emailMatch');
    }

    render() {
        const {auth} = this.props;

        if (!auth.uid) return <Redirect to='/login'/>;

        return (
            <Paper>
                <Grid
                    container
                    direction='row'
                    justify='center'
                    alignContent='center'
                    alignItems='center'
                    spacing={1}
                >
                    <Hidden smDown>
                        <Grid
                            item
                            xs={12} md={3}
                        >
                            <Box p={2}>
                                <Paper>

                                    <List component="nav" aria-label="main mailbox folders">
                                        <Link to='/profile' style={{textDecoration: 'none', color: 'black'}}>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <Icon>account_box</Icon>
                                                </ListItemIcon>
                                                <ListItemText primary="Preview Profile"/>
                                            </ListItem>
                                        </Link>
                                        <Divider/>
                                        <Link to='editBio' style={{textDecoration: 'none', color: 'black'}}>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <Icon>account_circle</Icon>
                                                </ListItemIcon>
                                                <ListItemText primary="Edit profile info"/>
                                            </ListItem>
                                        </Link>
                                        <Divider/>
                                        <Link to='editEmail' style={{textDecoration: 'none', color: 'black'}}>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <Icon>email</Icon>
                                                </ListItemIcon>
                                                <ListItemText primary="Edit email"/>
                                            </ListItem>
                                        </Link>
                                        <Divider/>
                                        <Link to='editPassword'
                                              style={{textDecoration: 'none', color: 'black'}}>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <Icon>edit</Icon>
                                                </ListItemIcon>
                                                <ListItemText primary="Edit password"/>
                                            </ListItem>
                                        </Link>
                                    </List>
                                </Paper>
                            </Box>
                        </Grid>
                    </Hidden>

                    <Hidden mdUp>
                        <Paper>
                            <Grid
                                container
                                direction='row'
                                justify='center'
                                alignContent='center'
                                alignItems='center'
                                spacing={1}
                            >
                                <Grid item xs={12}>
                                    <div style={{width: '90vw'}}>
                                        <IconButton edge="start" color="inherit" aria-label="Menu"
                                                    onClick={this.handleClick}>
                                            <MenuIcon/>
                                        </IconButton>
                                    </div>

                                    {
                                        this.state.showList && (

                                            <List component="nav" aria-label="main mailbox folders">
                                                <Divider/>
                                                <Link to='/profile'
                                                      style={{textDecoration: 'none', color: 'black'}}>
                                                    <ListItem button>
                                                        <ListItemIcon>
                                                            <Icon>account_box</Icon>
                                                        </ListItemIcon>
                                                        <ListItemText primary="Preview Profile"/>
                                                    </ListItem>
                                                </Link>
                                                <Divider/>
                                                <Link to='/editBio'
                                                      style={{textDecoration: 'none', color: 'black'}}>
                                                    <ListItem button>
                                                        <ListItemIcon>
                                                            <Icon>account_circle</Icon>
                                                        </ListItemIcon>
                                                        <ListItemText primary="Edit profile info"/>
                                                    </ListItem>
                                                </Link>
                                                <Divider/>
                                                <Link to='/editEmail'
                                                      style={{textDecoration: 'none', color: 'black'}}>
                                                    <ListItem button>
                                                        <ListItemIcon>
                                                            <Icon>email</Icon>
                                                        </ListItemIcon>
                                                        <ListItemText primary="Edit email"/>
                                                    </ListItem>
                                                </Link>
                                                <Divider/>
                                                <Link to='/editPassword'
                                                      style={{textDecoration: 'none', color: 'black'}}>
                                                    <ListItem button>
                                                        <ListItemIcon>
                                                            <Icon>edit</Icon>
                                                        </ListItemIcon>
                                                        <ListItemText primary="Edit password"/>
                                                    </ListItem>
                                                </Link>
                                                <Divider/>
                                            </List>

                                        )
                                    }
                                </Grid>
                            </Grid>
                        </Paper>
                    </Hidden>

                    <Grid
                        item
                        xs={12} md={6}
                    >
                        <Box p={2}>
                            <Paper>
                                <ValidatorForm
                                    onSubmit={this.handleSubmit}
                                    onError={errors => console.log(errors)}
                                >
                                    <Grid
                                        container
                                        direction='row'
                                        justify='center'
                                        alignContent='center'
                                        alignItems='center'
                                        spacing={1}
                                    >
                                        <Grid item xs={12}>
                                            <TextValidator
                                                label="New Email"
                                                onChange={this.handleChange}
                                                name="newEmail"
                                                fullWidth
                                                value={this.state.newEmail}
                                                validators={['required', 'isEmail']}
                                                errorMessages={['this field is required', 'this email is incorrect']}
                                            >
                                            </TextValidator>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextValidator
                                                label="Repeat Email"
                                                onChange={this.handleChange}
                                                name="repeatNewEmail"
                                                fullWidth
                                                value={this.state.repeatNewEmail}
                                                validators={['required', 'emailMatch', 'isEmail']}
                                                errorMessages={['this field is required', 'emails are not the same']}
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
                                        <Button type="submit">Change</Button>
                                    </Grid>
                                </ValidatorForm>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEmail)