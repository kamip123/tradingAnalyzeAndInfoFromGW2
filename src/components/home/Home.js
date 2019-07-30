import {Component} from "react";
import React from "react";
import Notifications from "./Notifications";
import MotDay from "./MotDay";
import Info from "./Info";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import "./Home.css"
import axios from 'axios'
import {connect} from 'react-redux'
import Typography from "@material-ui/core/Typography";
import dailyAchievement from '../../images/Daily_Achievement.png'
import blackLionLogo from '../../images/blackLionLogo.png'
import bosses from '../../images/Bosses.png'
import plans from '../../images/plans.png'
import {NavLink} from "react-router-dom";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import Button from "@material-ui/core/Button";

class Home extends Component {
    componentDidMount() {
        axios.get('https://api.guildwars2.com/v2/guild/E8E8E0FF-0F8E-E911-81A8-F161567B2263?access_token=B6A42833-F344-4043-BBCF-25140B758B17592E2509-F093-4BB5-8A54-D49928E38EED')
            .then(res => {
                this.props.changeGuildInfo(res.data);
            }).catch((error) => {
        });
    }

    render() {
        const isLoggedIn = !this.props.isLoggedIn;
        const {plansList, notifications} = this.props;
        return (
            <Paper>
                <div className="containerDiv">
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-start"
                        spacing={1}
                    >
                        <Grid item xs={12} md={8}>
                            <Box m={1.4}>
                                <MotDay motd={this.props.guildInfo.motd}/>
                            </Box>
                            <Box m={1.5}>
                                <Paper>
                                    <Box m={1.5} p={2}>
                                        <Info guildInfo={this.props.guildInfo}/>
                                    </Box>
                                    <Box p={2} m={1.5} borderBottom={1}>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="center"
                                            alignItems="center"
                                            spacing={1}
                                        >
                                            <Grid item xs={12}>
                                                <Box borderBottom={1} pb={1} mb={2}>
                                                    <Typography variant="h3" align="center" component="h3">
                                                        Functions
                                                    </Typography>
                                                </Box>
                                            </Grid>

                                            <Grid item xs={6} md={3}>
                                                <NavLink to="/daily" style={{textDecoration: 'none', color: 'black'}}>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center"
                                                        spacing={1}
                                                    >

                                                        <img src={dailyAchievement} alt="daily achivement" height="70"
                                                             width="70"/>

                                                        <Grid item xs={12}>
                                                            <Typography className="creatorFooter" align="center"
                                                                        variant="subtitle1"
                                                                        gutterBottom
                                                                        color="inherit">
                                                                Daily Achievements
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </NavLink>
                                            </Grid>

                                            <Grid item xs={6} md={3}>
                                                <NavLink to="/plans" style={{textDecoration: 'none', color: 'black'}}>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center"
                                                        spacing={1}
                                                    >

                                                        <img src={plans} alt="plans" height="70" width="70"/>

                                                        <Grid item xs={12}>
                                                            <Typography className="creatorFooter" align="center"
                                                                        variant="subtitle1"
                                                                        gutterBottom
                                                                        color="inherit">
                                                                Plans
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </NavLink>
                                            </Grid>

                                            <Grid item xs={6} md={3}>
                                                <NavLink to="/boss" style={{textDecoration: 'none', color: 'black'}}>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center"
                                                        spacing={1}
                                                    >

                                                        <img src={bosses} alt="bosses" height="70" width="70"/>

                                                        <Grid item xs={12}>
                                                            <Typography className="creatorFooter" align="center"
                                                                        variant="subtitle1"
                                                                        gutterBottom
                                                                        color="inherit">
                                                                Boss Timer
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </NavLink>
                                            </Grid>

                                            <Grid item xs={6} md={3}>
                                                <NavLink to="/legendary"
                                                         style={{textDecoration: 'none', color: 'black'}}>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center"
                                                        spacing={1}
                                                    >

                                                        <img src={blackLionLogo} alt="legendary" height="70"
                                                             width="70"/>

                                                        <Grid item xs={12}>
                                                            <Typography className="creatorFooter" align="center"
                                                                        variant="subtitle1"
                                                                        gutterBottom
                                                                        color="inherit">
                                                                Legendary Weapons
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </NavLink>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <Grid item xs={12}>
                                            <Typography align="center"
                                                        variant="h4"
                                                        gutterBottom
                                                        color="inherit">
                                                For more please
                                                <NavLink to="/login"
                                                         style={{textDecoration: 'none', color: 'black'}}>
                                                    <Button variant="contained" color="primary"
                                                            style={{margin: '10px'}}>
                                                        Login
                                                    </Button>
                                                </NavLink>
                                                or
                                                <NavLink to="/register"
                                                         style={{textDecoration: 'none', color: 'black'}}>
                                                    <Button variant="contained" color="primary"
                                                            style={{margin: '10px'}}>
                                                        Register
                                                    </Button>
                                                </NavLink>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Box>
                        </Grid>
                        {
                            isLoggedIn && (
                                <Grid item xs={12} md={4}>
                                    <Box m={1.5}>
                                        <Paper>
                                            <Box p={2}>
                                                <Typography variant="h3" align="center" component="h3">
                                                    Important:
                                                </Typography>
                                            </Box>
                                            <Notifications notifications={plansList}/>
                                        </Paper>
                                    </Box>
                                </Grid>
                            )
                        }
                        {
                            isLoggedIn && (
                                <Grid item xs={12}>
                                    <Box m={1.5}>
                                        <Paper>
                                            <Grid
                                                container
                                                direction="row"
                                                justify="center"
                                                alignItems="center"
                                                spacing={1}
                                            >
                                                <Grid item xs={12}>
                                                    <Box p={2}>
                                                        <Typography variant="h3" align="center" component="h3">
                                                            News:
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} md={8} lg={6}>
                                                    <Notifications notifications={notifications}/>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Box>
                                </Grid>
                            )
                        }
                    </Grid>
                </div>
            </Paper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.firebase.auth.isEmpty,
        notifications: state.firestore.ordered.notifications,
        plansList: state.firestore.ordered.plans,
        guildInfo: state.guild.guildInfo
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeGuildInfo: (info) => {
            dispatch({type: 'CHANGE_GUILD', info: info})
        }
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {collection: 'notifications', limit: 5, orderBy: ['date', 'desc']},
        {collection: 'plans', limit: 4, where: ['isImportant', '==', true], orderBy: ['date', 'desc']}
    ])
)(Home);
