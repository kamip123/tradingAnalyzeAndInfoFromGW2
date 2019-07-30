import React from "react"
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

const UserProfile = (props) => {
    const profile = props.profile[0];
    return (
        <Paper>
            <Grid
                container
                direction='row'
                justify='center'
                alignContent='center'
                alignItems='center'
                spacing={1}
            >
                <Grid
                    item
                    xs={12} md={6}
                >
                    <Box p={2}>
                        <Paper>

                            <Grid
                                container
                                direction='row'
                                justify='center'
                                alignContent='center'
                                alignItems='center'
                                spacing={1}
                            >
                                <Grid item xs={12}>
                                    <Box borderBottom={1} p={1}>
                                        <Typography variant="h6" component="p" align='center'>
                                            Nick: {profile.nick}
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box borderBottom={1} p={1}>
                                        <Typography variant="h6" component="p" align='center'>
                                            Guild: {profile.guild}
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <Box p={1} borderBottom={1}>
                                        <Typography variant="h6" component="p" align='center'>
                                            Bio: {profile.bio}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
};

const mapStateToProps = (state) => {
    if (state.firestore.ordered.users) {
        return {
            profile: state.firestore.ordered.users
        }
    } else {
        return {
            profile: [{nick: '', bio: '', guild: ''}]
        }
    }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        {collection: 'users', doc: props.match.params.id}
    ])
)(UserProfile)