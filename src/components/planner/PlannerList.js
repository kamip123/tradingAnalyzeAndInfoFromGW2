import {Component} from "react";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {connect} from "react-redux";
import PlanerListItem from "./PlanerListItem";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import { Redirect } from "react-router-dom";

class PlannerList extends Component {
    render() {

        const { auth } = this.props;

        if ( !auth.uid) return <Redirect to='/login' />;

        let plans = this.props.plans.length ? (
            this.props.plans.sort((a, b) => b.date.seconds - a.date.seconds).map(plan => {
                return (
                    <PlanerListItem plan={plan} key={plan.id}/>
                )
            })
        ) : (
            <p>No plans</p>
        );

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
                        {plans}
                    </Grid>
                </Box>
            </Paper>
        );
    }
}

const mapStateToProps = (state) => {
    if(state.firestore.data.plans){
        console.log(state);
        return {
            plans: state.firestore.ordered.plans,
            auth: state.firebase.auth
        }
    }
    else{
        return {
            plans: state.plan.plans,
            auth: state.firebase.auth
        }
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'plans'}
    ])
)(PlannerList);