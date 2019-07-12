import {Component} from "react";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import './Info.css'

class Info extends Component {
    render() {
        return (
            <Paper>
                <div className="paddingDiv2020">
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                        spacing={1}

                    >
                        <Grid item xs={5}>
                            <img src="https://guilds.gw2w2w.com/guilds/beer-script/150.svg" height="150" width="150"
                                 alt="Logo"/>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h4" component="h2" align="center">
                                {this.props.guildInfo.name} {this.props.guildInfo.tag}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item xs={12}>
                            <Typography className="creatorFooter" align="center" variant="subtitle1" gutterBottom
                                        color="inherit">
                                We are a guild from MMORPG game Guild Wars 2.
                                We specialize in fractals and world boss killing.
                                Our members are experienced and trustworthy. We never leave the task we once took.
                                We posses variety of items raging from ascended to legendary items.
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            Level: {this.props.guildInfo.level}
                        </Grid>
                        <Grid item xs={4}>
                            Influence: {this.props.guildInfo.influence}
                        </Grid>
                        <Grid item xs={4}>
                            Aetherium: {this.props.guildInfo.aetherium}
                        </Grid>
                        <Grid item xs={4}>
                            Resonance: {this.props.guildInfo.resonance}
                        </Grid>
                        <Grid item xs={4}>
                            Favor: {this.props.guildInfo.favor}
                        </Grid>
                        <Grid item xs={4}>
                            Members: {this.props.guildInfo.member_count}/{this.props.guildInfo.member_capacity}
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        );
    }
}

export default Info;