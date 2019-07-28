import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import {Component} from "react";
import React from "react";
import './Navbar.css';
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import {connect} from "react-redux";

import dailyAchievement from '../../images/Daily_Achievement.png'
import blackLionLogo from '../../images/blackLionLogo.png'
import bosses from '../../images/Bosses.png'
import Icon from "@material-ui/core/Icon";
import {NavLink} from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        showDrawer: state.utility.showDrawer,
        isLoggedIn: state.firebase.auth.isEmpty,
        profile: state.firebase.profile
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeDrawerState: (state) => {
            dispatch({type: 'CHANGE_DRAWER', state: state})
        }
    }
};

class Navbar extends Component {

    handleClick = (state) => {
        this.props.changeDrawerState(state);
    };

    render() {
        const isLoggedIn = !this.props.isLoggedIn;
        const { nick } = this.props.profile;

        return (
            <AppBar position="static">
                <Toolbar>
                    <NavLink to="/" style={{textDecoration: 'none', color: 'white'}}>
                        <img edge="start" src="https://guilds.gw2w2w.com/guilds/beer-script/100.svg" alt="Logo"
                             height="100"
                             width="100"/>
                    </NavLink>
                    <NavLink to="/" style={{textDecoration: 'none', color: 'white'}}>
                        <Typography variant="h4" color="inherit">
                            Beer Script
                        </Typography>
                    </NavLink>
                    <Hidden smDown>
                        <div className="rightButton">
                            <NavLink to="/daily" style={{textDecoration: 'none', color: 'white'}}><Button
                                color="inherit"><img src={dailyAchievement} alt="" height="30"
                                                     width="30"/> Daily</Button></NavLink>

                            <NavLink to="/boss" style={{textDecoration: 'none', color: 'white'}}><Button
                                color="inherit"><img src={bosses} alt="" height="30"
                                                     width="30"/> W Boss</Button></NavLink>

                            <NavLink to="/legendary" style={{textDecoration: 'none', color: 'white'}}><Button
                                color="inherit"><img src={blackLionLogo} alt="" height="30"
                                                     width="30"/> Legendary</Button></NavLink>

                            {
                                isLoggedIn && (
                                    <NavLink to="/plans" style={{textDecoration: 'none', color: 'white'}}><Button
                                        color="inherit"><Icon>event</Icon> Plans</Button></NavLink>
                                )
                            }

                            {
                                isLoggedIn && (
                                    <NavLink to="/newPlan" style={{textDecoration: 'none', color: 'white'}}><Button
                                        color="inherit"><Icon>note_add</Icon> Add new plan</Button></NavLink>
                                )
                            }

                            {
                                isLoggedIn && (
                                    <NavLink to="/logout" style={{textDecoration: 'none', color: 'white'}}><Button
                                        color="inherit"><Icon>logout</Icon> Log Out</Button></NavLink>
                                )
                            }

                            {
                                isLoggedIn && (
                                    <NavLink to="/profile" style={{textDecoration: 'none', color: 'white'}}><Button
                                        color="inherit"><Icon>person</Icon> { nick }</Button>
                                    </NavLink>
                                )
                            }

                            {
                                !isLoggedIn && (
                                    <NavLink to="/login" style={{textDecoration: 'none', color: 'white'}}><Button
                                        color="inherit"><Icon>exit_to_app</Icon> Log In</Button></NavLink>
                                )
                            }

                            {
                                !isLoggedIn && (
                                    <NavLink to="/register" style={{textDecoration: 'none', color: 'white'}}><Button
                                        color="inherit"><Icon>group_add</Icon> Register</Button></NavLink>
                                )
                            }
                        </div>
                    </Hidden>

                    <Hidden mdUp>
                        <div className="rightButton">
                            <IconButton edge="start" color="inherit" aria-label="Menu" onClick={() => {
                                this.handleClick(true)
                            }}>
                                <MenuIcon/>
                            </IconButton>
                        </div>
                    </Hidden>

                </Toolbar>
            </AppBar>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);