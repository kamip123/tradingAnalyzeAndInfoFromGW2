import {Component} from "react";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Boss from "./Boss";


class WBossList extends Component {
    render() {
        const times = {
            tequatl: ['10:00', '14:00', '18:00'],
            karka: ['10:00', '14:00', '18:00'],
            wurm: ['10:00', '14:00', '18:00'],
            shatter: ['10:00', '14:00', '18:00'],
            jormag: ['10:00', '14:00', '18:00']
        };

        return (
            <Paper>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                >
                    <Grid item xs={12}><Boss boss="tequatl" times={times.tequatl}/></Grid>
                    <Grid item xs={12}><Boss boss="karka" times={times.karka}/></Grid>
                    <Grid item xs={12}><Boss boss="wurm" times={times.wurm}/></Grid>
                    <Grid item xs={12}><Boss boss="shatter" times={times.shatter}/></Grid>
                    <Grid item xs={12}><Boss boss="jormag" times={times.jormag}/></Grid>
                </Grid>
            </Paper>
        );
    }
}

export default WBossList;