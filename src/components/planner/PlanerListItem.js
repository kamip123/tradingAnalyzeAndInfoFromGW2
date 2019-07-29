import {Component} from "react";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import {NavLink} from "react-router-dom";
import Divider from "@material-ui/core/Divider";

class PlanerListItem extends Component {
    render() {
        const time = new Date(this.props.plan.date.seconds*1000);
        const year = time.getFullYear();
        const month = ("0" + (time.getMonth()+1)).substr(-2);
        const day = ("0" + time.getDate()).substr(-2);
        const hour = ("0" + time.getHours()).substr(-2);
        const minute = ("0" + time.getMinutes()).substr(-2);
        const formattedTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute ;

        return (
            <Grid item xs={12} md={7}>
                <NavLink to={'/plans/' + this.props.plan.id} style={{textDecoration: 'none', color: 'white'}}>
                <Box p={2}>
                    <Card>
                        <CardHeader
                            title={this.props.plan.title}
                            subheader={'Created at: ' + formattedTime}
                        />
                        <Divider/>
                        <CardContent>
                            <Typography variant="h6" component="p">
                                {this.props.plan.summary}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography variant="body2" component="p">
                                Event author: {this.props.plan.authorNick}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                </NavLink>
            </Grid>
        )
    }
}

export default PlanerListItem