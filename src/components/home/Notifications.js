import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const Notifications = (props) => {
    const {notifications} = props;
    return (
        <div>
            {notifications && notifications.map(notification => {
                let path = '';
                if(notification.eventId === '') {
                    path = '/profiles/' + notification.userId;
                } else {
                    path = '/plans/' + notification.eventId;
                }
                const time = new Date(notification.date.seconds*1000);
                const year = time.getFullYear();
                const month = ("0" + (time.getMonth()+1)).substr(-2);
                const day = ("0" + time.getDate()).substr(-2);
                const hour = ("0" + time.getHours()).substr(-2);
                const minute = ("0" + time.getMinutes()).substr(-2);
                const formattedTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute ;

                return (
                    <Box p={2} key={notification.id}>
                        <Card>
                            <CardHeader
                                title={notification.title}
                                subheader={'Created at: ' + formattedTime}
                            />
                            <Divider/>
                            <CardContent>
                                <Typography variant="h6" component="p">
                                    {notification.summary}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={path} style={{textDecoration: 'none', color: 'black'}}>
                                    <Button size="small">Learn More</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Box>
                )
            })}
            {!notifications && (
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                >
                    <Box p={2}>
                        <CircularProgress/>
                    </Box>
                </Grid>
            )}
        </div>
    );
};

export default Notifications;