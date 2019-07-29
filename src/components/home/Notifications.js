import {Component} from "react";
import React from "react";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

class Notifications extends Component {
    render() {
        const eventTitle = 'new user';
        const eventDate = '11';
        const eventText = 'this new user nickname is: fred';
        return (
            <Paper>
                <Box p={2}>
                    <Card>
                        <CardHeader
                            title={eventTitle}
                            subheader={'Created at: ' + eventDate}
                        />
                        <Divider/>
                        <CardContent>
                            <Typography variant="h6" component="p">
                                {eventText}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Paper>
        );
    }
}

export default Notifications;