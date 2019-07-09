import {Component} from "react";
import React from "react";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";

class MotDay extends Component {
    render() {
        return (
            <Paper>
                <Card>
                    <CardContent>
                        <Box borderBottom={1} p={2} m={2}>
                            <Typography variant="h4" component="h2" align="center">
                                Message Of The Day
                            </Typography>
                        </Box>
                        <Typography variant="h5" component="h2" align="center">
                            {this.props.motd.split('\n').map((item, key) => {
                                return <span key={key}>{item}<br/></span>
                            })}
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>
        );
    }
}

export default MotDay;