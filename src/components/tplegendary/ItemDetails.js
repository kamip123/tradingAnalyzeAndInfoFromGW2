import {Component} from "react";
import React from "react";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "./Item.css"

import CanvasJSReact from '../canvasJS/canvasjs.react';
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";

let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ItemDetails extends Component {
    state = {
        sellAVG: [],
        buyAVG: [],
        quantity: [],
        selectYear: 2019,
        rawData: [],
        rawBuyData: [],
        itemDetails: {
            chat_link: "",
            default_skin: null,
            details: {
                damage_type: "",
                defense: 0,
                max_power: null,
                min_power: null,
                secondary_suffix_item_id: "",
                stat_choices: [],
                suffix_item_id: null,
                type: ""
            },
            flags: [],
            game_types: [],
            icon: "",
            id: null,
            level: null,
            name: "",
            rarity: "",
            restrictions: [],
            type: "",
            vendor_value: null
        },
        price: {
            id: null,
            whitelisted: false,
            buys: {
                quantity: null,
                unit_price: null
            },
            sells: {
                quantity: null,
                unit_price: null
            }
        },
    };

    constructor() {
        super();
        this.toggleDataSeries = this.toggleDataSeries.bind(this);
        this.addSymbols = this.addSymbols.bind(this);
    }

    addSymbols(e) {
        let suffixes = ["", "K", "M", "B"];
        let order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if (order > suffixes.length - 1)
            order = suffixes.length - 1;
        let suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }

    toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        this.chart.render();
    }

    updateData = (currentYear = 2019) => {
        let sellAVGapi = [];
        let quantityAVGapi = [];

        let i = 0;
        let tempResultsQuantity = 0;
        let tempResultsValue = 0;
        let tempItemQuantity = 0;

        for (let j = 0; j < 12; j++) {
            while (i < this.state.rawData.length) {
                let year = parseInt(this.state.rawData[i].listing_datetime.substr(0, 4), 10);
                let month = parseInt(this.state.rawData[i].listing_datetime.substr(5, 7), 10) - 1;

                if (currentYear === year) {
                    if (j === month) {
                        tempResultsQuantity++;
                        tempResultsValue += this.state.rawData[i].unit_price;
                        tempItemQuantity += this.state.rawData[i].quantity;
                    }
                }
                i++;
            }
            if (tempResultsQuantity === 0) {
                sellAVGapi.push({
                    x: new Date(currentYear, j),
                    y: 0
                });
                quantityAVGapi.push({
                    x: new Date(currentYear, j),
                    y: 0
                });
            } else {
                sellAVGapi.push({
                    x: new Date(currentYear, j),
                    y: tempResultsValue / tempResultsQuantity
                });
                quantityAVGapi.push({
                    x: new Date(currentYear, j),
                    y: tempItemQuantity / tempResultsQuantity
                });
            }
            i = 0;
            tempResultsQuantity = 0;
            tempResultsValue = 0;
            tempItemQuantity = 0;
        }
        this.setState({
            sellAVG: sellAVGapi,
            quantity: quantityAVGapi
        });
    };

    updateBuyData = (currentYear = 2019) => {
        let buyAVGapi = [];

        let i = 0;
        let tempResultsQuantity = 0;
        let tempResultsValue = 0;


        for (let j = 0; j < 12; j++) {
            while (i < this.state.rawBuyData.length) {
                let year = parseInt(this.state.rawBuyData[i].listing_datetime.substr(0, 4), 10);
                let month = parseInt(this.state.rawBuyData[i].listing_datetime.substr(5, 7), 10) - 1;

                if (currentYear === year) {
                    if (j === month) {
                        tempResultsQuantity++;
                        tempResultsValue += this.state.rawBuyData[i].unit_price;
                    }
                }
                i++;
            }
            if (tempResultsQuantity === 0) {
                buyAVGapi.push({
                    x: new Date(currentYear, j),
                    y: 0
                });
            } else {
                buyAVGapi.push({
                    x: new Date(currentYear, j),
                    y: tempResultsValue / tempResultsQuantity
                });
            }
            i = 0;
            tempResultsQuantity = 0;
            tempResultsValue = 0;
        }
        this.setState({
            buyAVG: buyAVGapi
        });
    };

    async getData() {

        const {id} = this.props.match.params;

        let itemData = [];
        let promises = [];

        let itemDataBuy = [];
        let promisesBuy = [];

        axios.get('http://www.gw2spidy.com/api/v0.9/json/listings/' + id + '/sell')
            .then(res => {
                itemData = res.data.results;
                if (parseInt(res.data.last_page, 10) > 1) {
                    for (let i = 2; i < res.data.last_page + 1; i++) {
                        promises.push(axios.get('http://www.gw2spidy.com/api/v0.9/json/listings/' + id + '/sell/' + i)
                            .then(res => {
                                itemData = [...itemData, ...res.data.results]
                            }))
                    }
                    axios.all(promises)
                        .then(
                            () => {
                                this.setState({
                                    rawData: itemData
                                });
                                this.updateData();
                            }
                        );
                } else {
                    this.setState({
                        rawData: itemData
                    });
                    this.updateData();
                }

            });

        axios.get('http://www.gw2spidy.com/api/v0.9/json/listings/' + id + '/buy')
            .then(res => {
                itemDataBuy = res.data.results;
                if (parseInt(res.data.last_page, 10) > 1) {
                    for (let i = 2; i < res.data.last_page + 1; i++) {
                        promisesBuy.push(axios.get('http://www.gw2spidy.com/api/v0.9/json/listings/' + id + '/buy/' + i)
                            .then(res => {
                                itemDataBuy = [...itemDataBuy, ...res.data.results]
                            }))
                    }
                    axios.all(promisesBuy)
                        .then(
                            () => {
                                this.setState({
                                    rawBuyData: itemDataBuy
                                });
                                this.updateBuyData();
                            }
                        );
                } else {
                    this.setState({
                        rawBuyData: itemDataBuy
                    });
                    this.updateBuyData();
                }

            });

    }

    componentDidMount() {
        const {id} = this.props.match.params;

        if (typeof (this.props.location.state) === 'undefined') {
            axios.get('https://api.guildwars2.com/v2/items?ids=' + id + '&lang=en')
                .then(res => {
                    this.setState({
                        itemDetails: res.data[0]
                    });
                });
            axios.get('https://api.guildwars2.com/v2/commerce/prices/' + id)
                .then(res => {
                    this.setState({
                        price: res.data
                    });
                })
        } else {
            this.setState({
                itemDetails: this.props.location.state.details,
                price: this.props.location.state.price
            });
        }

        this.getData();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
        if (event.target.name === "selectYear") {
            this.updateData(event.target.value);
            this.updateBuyData(event.target.value);
        }
    };

    render() {
        let thisYear = (new Date()).getFullYear();
        let allYears = [];
        for (let x = 2013; x <= thisYear; x++) {
            allYears.push(x)
        }

        const yearList = allYears.map((x) => {
            return (
                <MenuItem value={x} key={x}>{x}</MenuItem>
            )
        });

        const options = {
            animationEnabled: true,
            colorSet: "colorSet2",
            title: {
                text: "Trading posts data"
            },
            axisX: {
                valueFormatString: "MMMM"
            },
            axisY: {
                title: "Gold",
                titleFontColor: "#cd2f11",
                lineColor: "#cd2f11",
                labelFontColor: "#cd2f11",
                tickColor: "#cd2f11",
                includeZero: false
            },
            axisY2: {
                title: "Quantity",
                titleFontColor: "#6d78ad",
                lineColor: "#6d78ad",
                labelFontColor: "#6d78ad",
                tickColor: "#6d78ad",
                includeZero: true
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                itemclick: this.toggleDataSeries,
                verticalAlign: "top"
            },
            data: [{
                type: "column",
                name: "Quantity",
                axisYType: "secondary",
                showInLegend: true,
                xValueFormatString: "MMMM YYYY",
                yValueFormatString: "##0",
                dataPoints: this.state.quantity
            }, {
                type: "line",
                name: "Buy Offers Avg",
                showInLegend: true,
                yValueFormatString: "$#,##0",
                dataPoints: this.state.buyAVG
            }, {
                type: "line",
                name: "Sell Offers Avg",
                showInLegend: true,
                yValueFormatString: "$#,##0",
                dataPoints: this.state.sellAVG
            }]
        };
        return (
            <Paper>
            <Grid item xs={12}>
                <Box borderBottom={1} p={2}>
                    <Card>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={1}
                        >
                            <Grid item xs={12}>
                                <Box borderBottom={1} p={1} m={1}>
                                    <Typography variant="h4" align="center">
                                        {this.state.itemDetails.name}
                                        <img className="image" src={this.state.itemDetails.icon} alt="icon"/>
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <table>
                                        <tbody>
                                        <tr>
                                            <th>Rarity:</th>
                                            <td>{this.state.itemDetails.rarity}</td>
                                        </tr>
                                        <tr>
                                            <th>Type:</th>
                                            <td>{this.state.itemDetails.type} - {this.state.itemDetails.details.type}</td>
                                        </tr>
                                        <tr>
                                            <th>Damage:</th>
                                            <td>{this.state.itemDetails.details.min_power} - {this.state.itemDetails.details.max_power}</td>
                                        </tr>
                                        <tr>
                                            <th>Level:</th>
                                            <td>{this.state.itemDetails.level}</td>
                                        </tr>
                                        <tr>
                                            <th>Chat Link:</th>
                                            <td>{this.state.itemDetails.chat_link}</td>
                                        </tr>
                                        <tr>
                                            <th>Buy:</th>
                                            <td>{this.state.price.buys.unit_price}</td>
                                        </tr>
                                        <tr>
                                            <th>Sell:</th>
                                            <td>{this.state.price.sells.unit_price}</td>
                                        </tr>
                                        <tr>
                                            <th>Quantity:</th>
                                            <td>{this.state.price.sells.quantity}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="selectYear">
                                        Year
                                    </InputLabel>
                                    <Select
                                        value={this.state.selectYear}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'selectYear',
                                            id: 'selectYear',
                                        }}
                                    >
                                        {yearList}
                                    </Select>
                                </FormControl>
                                <CanvasJSChart options={options} onRef={ref => this.chart = ref}/>
                            </Grid>
                        </Grid>
                    </Card>
                </Box>
            </Grid>
            </Paper>
        );
    }
}

export default ItemDetails;
