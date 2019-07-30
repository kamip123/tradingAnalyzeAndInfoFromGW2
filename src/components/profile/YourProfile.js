import React, {Component} from "react"
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
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
import Typography from "@material-ui/core/Typography";

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
};

class yourProfile extends Component {

    state = {
        showList: false
    };

    handleClick = () => {
        this.setState({
            showList: !this.state.showList
        });
    };

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
                                        <Link to='profile/editBio' style={{textDecoration: 'none', color: 'black'}}>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <Icon>account_circle</Icon>
                                                </ListItemIcon>
                                                <ListItemText primary="Edit profile info"/>
                                            </ListItem>
                                        </Link>
                                        <Divider/>
                                        <Link to='profile/editEmail' style={{textDecoration: 'none', color: 'black'}}>
                                            <ListItem button>
                                                <ListItemIcon>
                                                    <Icon>email</Icon>
                                                </ListItemIcon>
                                                <ListItemText primary="Edit email"/>
                                            </ListItem>
                                        </Link>
                                        <Divider/>
                                        <Link to='profile/editPassword'
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
                                                <Link to='profile/editBio'
                                                      style={{textDecoration: 'none', color: 'black'}}>
                                                    <ListItem button>
                                                        <ListItemIcon>
                                                            <Icon>account_circle</Icon>
                                                        </ListItemIcon>
                                                        <ListItemText primary="Edit profile info"/>
                                                    </ListItem>
                                                </Link>
                                                <Divider/>
                                                <Link to='profile/editEmail'
                                                      style={{textDecoration: 'none', color: 'black'}}>
                                                    <ListItem button>
                                                        <ListItemIcon>
                                                            <Icon>email</Icon>
                                                        </ListItemIcon>
                                                        <ListItemText primary="Edit email"/>
                                                    </ListItem>
                                                </Link>
                                                <Divider/>
                                                <Link to='profile/editPassword'
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
                                            <Typography variant="h6" component="p" align='center'>
                                                Nick: {this.props.profile.nick}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box borderBottom={1} p={1}>
                                            <Typography variant="h6" component="p" align='center'>
                                                Guild: {this.props.profile.guild}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box p={1} borderBottom={1}>
                                            <Typography variant="h6" component="p" align='center'>
                                                Bio: {this.props.profile.bio}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box p={1}>
                                            <Typography variant="h6" component="p" align='center'>
                                                Email: {this.props.auth.email}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>

                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

export default connect(mapStateToProps)(yourProfile)