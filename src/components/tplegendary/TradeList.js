import {Component} from "react";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Item from "./Item";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

class TradeList extends Component {

    state = {
        itemsData: [],
        itemsPrices: []
    };

    ids = [
        30698,
        30697,
        30684,
        30702,
        30687,
        30690,
        30685,
        30701,
        30695,
        30688,
        30692,
        30694,
        30693,
        30700,
        30703,
        30704,
        30689,
        30686,
        30691,
        30696,
        30699
    ];

    componentDidMount() {
        for (let i = 0; i < this.ids.length; i++) {
            axios.get('https://api.guildwars2.com/v2/items?ids=' + this.ids[i] + '&lang=en')
                .then(res => {
                    let itemsData = [...this.state.itemsData, res.data[0]];

                    this.setState({
                        itemsData
                    });
                });

            axios.get('https://api.guildwars2.com/v2/commerce/prices/' + this.ids[i])
                .then(res => {
                    let itemsPrices = [...this.state.itemsPrices, res.data];

                    this.setState({
                        itemsPrices
                    });
                })
        }
    }

    render() {

        let items = this.state.itemsData.length === this.ids.length && this.state.itemsPrices.length === this.ids.length ? (
            this.state.itemsData.map((details, index) => {
                return (
                    <Item details={details} price={this.state.itemsPrices.find(function (element) {

                        if (element.id === details.id) {

                            return element
                        }
                        return false;
                    })} key={details.id}/>
                )
            })
        ) : (
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
        );

        return (
            <Paper>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                >
                    <Grid item xs={12}>
                        <Box borderBottom={1} p={2}>
                            <Typography variant="h4" align="center">
                                Legendary Weapons
                            </Typography>
                        </Box>
                    </Grid>
                    {items}
                </Grid>
            </Paper>
        );
    }
}

export default TradeList;