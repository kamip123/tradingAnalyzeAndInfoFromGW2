import {Component} from "react";
import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

class ImportantEvent extends Component {
    render() {
        return (
            <Paper>
                <Box p={2}>
                    <Typography variant="h3" align="center" component="h3">
                        Important:
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
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Paper>
        );
    }
}

export default ImportantEvent;