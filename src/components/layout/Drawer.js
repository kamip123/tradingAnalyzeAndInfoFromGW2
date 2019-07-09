import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {connect} from 'react-redux'
import './Drawer.css'
import dailyAchievement from "../../images/Daily_Achievement.png";
import bosses from "../../images/Bosses.png";
import blackLionLogo from "../../images/blackLionLogo.png";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import {NavLink} from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        showDrawer: state.utility.showDrawer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeDrawerState: (state) => {
            dispatch({type: 'CHANGE_DRAWER', state: state})
        }
    }
};

class TemporaryDrawer extends Component {
    handleClick = (state) => {
        this.props.changeDrawerState(state);
    };

    render() {
        return (
            <div>
                <Drawer anchor="right" open={this.props.showDrawer} onClose={() => {
                    this.handleClick(false)
                }}>
                    <List>
                        <Divider/>
                        <NavLink to="/" style={{textDecoration: 'none'}}>
                            <ListItem button>
                                <ListItemIcon><img edge="start" src="https://guilds.gw2w2w.com/guilds/beer-script/30.svg" alt="Logo"
                                                   height="30"
                                                   width="30"/></ListItemIcon>
                                <ListItemText>Home</ListItemText>
                            </ListItem>
                        </NavLink>
                        <Divider/>
                        <NavLink to="/daily" style={{textDecoration: 'none'}}>
                            <ListItem button>
                                <ListItemIcon><img src={dailyAchievement} alt="" height="30" width="30"/></ListItemIcon>
                                <ListItemText>Daily Achievement</ListItemText>
                            </ListItem>
                        </NavLink>
                        <Divider/>
                        <NavLink to="/plans" style={{textDecoration: 'none'}}>
                            <ListItem button>
                                <ListItemIcon><Icon>schedule</Icon></ListItemIcon>
                                <ListItemText>Plans</ListItemText>
                            </ListItem>
                        </NavLink>
                        <Divider/>
                        <NavLink to="/boss" style={{textDecoration: 'none'}}>
                            <ListItem button>
                                <ListItemIcon><img src={bosses} alt="" height="30" width="30"/></ListItemIcon>
                                <ListItemText>W Bosse</ListItemText>
                            </ListItem>
                        </NavLink>
                        <Divider/>
                        <NavLink to="/legendary" style={{textDecoration: 'none'}}>
                            <ListItem button>
                                <ListItemIcon><img src={blackLionLogo} alt="" height="30" width="30"/></ListItemIcon>
                                <ListItemText>Legendary</ListItemText>
                            </ListItem>
                        </NavLink>
                        <NavLink to="/login" style={{textDecoration: 'none'}}>
                            <Divider/>
                            <ListItem button>
                                <ListItemIcon><Icon>exit_to_app</Icon></ListItemIcon>
                                <ListItemText>Log in/Log Out</ListItemText>
                            </ListItem>
                        </NavLink>
                        <Divider/>
                    </List>
                </Drawer>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemporaryDrawer)
