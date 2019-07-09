import {Component} from "react";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Item from "./Item";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

class TradeList extends Component {

    state = {
        itemsData: []
    };

    ids = [
        30698
    ];

    /*ids = [
        30698,
        30699,
        30686,
        30696,
        30697,
        30684,
        30702,
        30687,
        30690,
        30685,
        30701,
        30691,
        30695,
        30688,
        30692,
        30694,
        30693,
        30700,
        30703,
        30704,
        30689
    ];*/

    componentDidMount() {
        for (let i = 0; i < this.ids.length; i++){
            axios.get('https://api.guildwars2.com/v2/items?ids=' + this.ids[i] + '&lang=en')
                .then(res => {
                    let itemsData = [...this.state.itemsData, res.data[0]];
                    this.setState({
                        itemsData
                    });
                })
        }
    }

    render() {

        let items = this.state.itemsData.length ? (
            this.state.itemsData.map(details => {
                return(<Item details={details} price={{buy: 10, sell:10, quantity: 10}}/>)
            })
        ) : (
            <p>Encountered and error, please try refreshing the page.</p>
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
                    <Box borderBottom={1} p={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center">
                                Legendary Weapons
                            </Typography>
                        </Grid>
                    </Box>
                    {items}
                </Grid>
            </Paper>
        );
    }
}

export default TradeList;