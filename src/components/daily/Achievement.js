import {Component} from "react";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

class Achievement extends Component {
    render() {
        return (
            <Box borderBottom={1} p={2}>
                <Card>
                    <CardContent>
                        <Box borderBottom={1} p={2} m={2}>
                            <Typography variant="h4" align="center">
                                {this.props.achi.name}
                            </Typography>
                            <Typography variant="textSecondary" component="h2" align="center">
                                {this.props.achi.description}
                            </Typography>
                        </Box>
                        <Typography variant="h5" align="left">
                            {this.props.achi.requirement}
                        </Typography>
                        <Typography variant="h6" align="left">
                            Required: {this.props.achi.tiers[0].count} times
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        );
    }
}

export default Achievement;