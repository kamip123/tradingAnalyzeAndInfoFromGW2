import {Component} from "react";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Boss from "./Boss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

class WBossList extends Component {

    state = {
        percent: '0%'
    };

    updateTimer = () => {
        const minutesInDay = 1440;

        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        let newPercentage = ((hours * 60 + minutes) / minutesInDay) * 100;
        let numb = String(newPercentage) + '%';

        this.setState({
            percent: numb
        });
        setTimeout(this.updateTimer, 60000)
    };

    componentDidMount() {
        this.updateTimer();
    }

    componentWillUnmount() {
        let id = window.setTimeout(function() {}, 0);
        while (id--) {
            clearTimeout(id);
        }
    }

    render() {
        const times = {
            utc: '+2',
            tequatl: ['02:00', '05:00', '09:00', '13:30', '18:00', '21:00'],
            karka: ['04:00', '08:00', '12:30', '17:00', '20:00', '01:00'],
            wurm: ['03:00', '06:00', '10:00', '14:30', '19:00', '22:00'],
            shatter: ['03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '00:00'],
            jormag: ['04:30', '07:30', '10:30', '13:30', '16:30', '19:30', '22:30', '01:30']
        };
        const time = new Date();
        const hour = time.getHours();
        const minute = ('0' + time.getMinutes()).substr(-2);

        return (
            <Paper>
                <div style={{padding: '20px'}}>
                    <div style={{position: 'relative', width: '100%'}}>
                        <div style={{
                            position: 'absolute',
                            top: '105px',
                            left: this.state.percent,
                            backgroundColor: 'red',
                            width: '5px',
                            height: '965px'
                        }}/>
                    </div>
                </div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                >
                    <Grid item xs={12}>
                        <Typography variant="h2" component="h2" align="center">
                            Boss timers:
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <div style={{backgroundColor: 'red', width: this.state.percent, height: 30}}>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <h3 style={{margin: '5px'}}>{hour}:{minute}</h3>
                                    </Grid>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}><Boss boss="Tequatl" times={times.tequatl}/></Grid>
                    <Grid item xs={12}><Boss boss="Karka" times={times.karka}/></Grid>
                    <Grid item xs={12}><Boss boss="wurm" times={times.wurm}/></Grid>
                    <Grid item xs={12}><Boss boss="shatter" times={times.shatter}/></Grid>
                    <Grid item xs={12}><Boss boss="jormag" times={times.jormag}/></Grid>
                </Grid>
            </Paper>
        );
    }
}

export default WBossList;