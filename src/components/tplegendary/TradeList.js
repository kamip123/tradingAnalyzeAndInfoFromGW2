import {Component} from "react";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ItemDetails from "./ItemDetails";
import Item from "./Item";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import {NavLink} from "react-router-dom";

class TradeList extends Component {

    state = {
        itemsData: []
    };

    /*
    ids = [
        30698
    ];
    */
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
                    console.log(itemsData)
                })
        }
    }

    render() {

        let items = this.state.itemsData.length ? (
            this.state.itemsData.map(details => {
                return (<NavLink to={{ pathname: '/legendary/' + details.id, state: { details: details, price: {buy: 10, sell: 10, quantity: 10}} }} style={{ textDecoration: 'none', color: 'white' }}><Item details={details} price={{buy: 10, sell: 10, quantity: 10}}/></NavLink>)
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