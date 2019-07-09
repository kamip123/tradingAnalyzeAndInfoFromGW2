import {Component} from "react";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

class Boss extends Component {
    render() {
        return (
            <Paper>
                <Card>
                    <CardContent>
                        <Box borderBottom={1} p={2} m={2}>
                            <Typography variant="h4" component="h2" align="center">
                                {this.props.boss}
                            </Typography>
                        </Box>
                        <Typography variant="h5" component="h2" align="center">
                            {this.props.times}
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>
        );
    }
}

export default Boss;