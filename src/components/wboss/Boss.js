import {Component} from "react";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

class Boss extends Component {

    state = {
        bcolor: [],
    };

    generateColor() {
        return '#' + Math.random().toString(16).substr(-6);
    };

    setColors = () => {
        let newList = [];
        for (let i = 0; i < this.props.times.length; i++) {
            newList = [...newList, this.generateColor()];
        }
        this.setState({
            bcolor: newList
        });
        console.log(this.state.bcolor)
    };

    componentDidMount() {
        this.setColors();
    }

    render() {
        let timers = this.props.times.length ? (
            this.props.times.map((time, index) => {
                const minutesInDay = 1440;

                let colorRand = this.state.bcolor[index];
                let newPercentage = ((parseInt(time.substr(0, 2), 10) * 60 + parseInt(time.substr(3, 5), 10)) / minutesInDay) * 100;
                let numb = String(newPercentage) + '%';

                return (
                    <div style={{backgroundColor: colorRand, position: 'absolute', left: numb}}>
                        <Typography variant="h4" component="h4" align="center">
                            {time}
                        </Typography>
                    </div>
                )
            })
        ) : (
            <p>Encountered and error</p>
        );

        return (
                <Card>
                    <CardContent>
                        <Box borderBottom={1} p={2} m={2}>
                            <Typography variant="h4" component="h2" align="center">
                                {this.props.boss}
                            </Typography>
                        </Box>
                        <div style={{backgroundColor: 'gray', 'paddingLeft': '4px'}}>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                spacing={1}
                            >
                                <div style={{position: 'relative', width: '100%', height: '50px'}}>
                                    {timers}
                                </div>
                            </Grid>
                            </div>
                    </CardContent>
                </Card>
        );
    }
}

export default Boss;