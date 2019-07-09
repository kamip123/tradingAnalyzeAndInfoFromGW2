import {Component} from "react";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import './Footer.css';
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";

class Footer extends Component {
    render() {
        return (
            <AppBar position="static">
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item xs={2} style={{justifyContent: 'center'}}>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                <Button color="inherit">About</Button>
                            </Grid>
                        </Grid>

                        <Grid item xs={2} style={{justifyContent: 'center'}}>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                <Button color="inherit">Contact</Button>
                            </Grid>
                        </Grid>

                        <Grid item xs={2} style={{justifyContent: 'center'}}>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                <Button color="inherit">Terms</Button>
                            </Grid>
                        </Grid>

                        <Grid item xs={8}>
                            <Box borderTop={1}>
                                <Typography className="creatorFooter" align="center" variant="subtitle1" gutterBottom
                                            color="inherit">
                                    Made by Kamil for our Glorious Guild :)
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

            </AppBar>
        );
    }
}

export default Footer;