import {Component} from "react";
import React from "react";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

class Notifications extends Component {
    render() {
        return (
            <Paper>
                <Box p={2}>
                    <Typography variant="h3" align="center" component="h3">
                        Notifications
                    </Typography>
                </Box>
                <Box p={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                New Event: Kill a Dragon
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                23-12-2019
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box p={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                New User Has Joined: Test
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                22-12-2019
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box p={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                New User Has Joined: Test
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                22-12-2019
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Paper>
        );
    }
}

export default Notifications;