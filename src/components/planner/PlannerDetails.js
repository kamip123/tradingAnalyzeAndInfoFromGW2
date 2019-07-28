import React from "react";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {connect} from 'react-redux'
import {firestoreConnect} from "react-redux-firebase";
import {compose} from 'redux'
import Divider from "@material-ui/core/Divider";
import { Redirect } from "react-router-dom";

const PlannerDetails = (props) => {
    const { plan, auth } = props;

    if ( plan ){

        if ( !auth.uid) return <Redirect to='/login' />;

        const time = new Date(plan.date.seconds*1000);
        const year = time.getFullYear();
        const month = ("0" + (time.getMonth()+1)).substr(-2);
        const day = ("0" + time.getDate()).substr(-2);
        const hour = ("0" + time.getHours()).substr(-2);
        const minute = ("0" + time.getMinutes()).substr(-2);
        const formattedTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute ;

        return (
            <Paper>
                <Box p={2}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item xs={12} md={7}>
                            <Card>
                                <CardHeader
                                    title={plan.title}
                                    subheader={'Created at: ' + formattedTime}
                                />
                                <Divider/>
                                <CardContent>
                                    <Typography variant="h6" component="p">
                                        {plan.text}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="body2" component="p">
                                        Event author: {plan.authorNick}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        )
    }else{
        return (
            <Paper>
                <Box p={2}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item xs={12} md={8}>
                            <Card>
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Couldn't find plan with this id
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        )
    }
};

const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    const plans = state.firestore.data.plans;
    const plan = plans ? plans[id] : null;
    return {
        plan: plan,
        auth: state.firebase.auth
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'plans'}
    ])
)(PlannerDetails);