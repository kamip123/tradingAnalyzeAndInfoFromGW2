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
import {editBio} from "../../store/actions/authActions";

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        editBio: (date) => dispatch(editBio(date))
    }
};

class EditBio extends Component {

    state = {
        showList: false,
        guild: '',
        bio: '',
        nick: ''
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
        this.props.editBio(this.state);
    };

    componentDidMount() {
        this.setState({
            bio: this.props.profile.bio,
            nick: this.props.profile.nick,
            guild: this.props.profile.guild
        })
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
                                            <Box borderBottom={1} p={1}>
                                                <TextValidator
                                                    label="Nick"
                                                    onChange={this.handleChange}
                                                    name="nick"
                                                    fullWidth
                                                    value={this.state.nick}
                                                    validators={['required', 'minStringLength:5', 'maxStringLength:55']}
                                                    errorMessages={['this field is required', 'min length is 5', 'max length is 55']}
                                                />
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Box borderBottom={1} p={1}>
                                                <TextValidator
                                                    label="Guild"
                                                    onChange={this.handleChange}
                                                    name="guild"
                                                    fullWidth
                                                    value={this.state.guild}
                                                    validators={['required', 'minStringLength:5', 'maxStringLength:55']}
                                                    errorMessages={['this field is required', 'min length is 5', 'max length is 55']}
                                                />
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Box p={1}>
                                                <TextValidator
                                                    label="Bio"
                                                    onChange={this.handleChange}
                                                    name="bio"
                                                    fullWidth
                                                    multiline
                                                    rows="3"
                                                    value={this.state.bio}
                                                    validators={['required', 'minStringLength:5', 'maxStringLength:255']}
                                                    errorMessages={['this field is required', 'min length is 5', 'max length is 55']}
                                                />
                                            </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditBio)