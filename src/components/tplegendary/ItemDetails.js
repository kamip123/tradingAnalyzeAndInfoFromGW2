import {Component} from "react";
import React from "react";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import "./Item.css"

import CanvasJSReact from '../canvasJS/canvasjs.react';
import axios from "axios";

let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ItemDetails extends Component {
    state = {
        sellAVG: [],
        buyAVG: [],
        quantity: [],
        selectYear: 2019,
        rawData: [],
        itemDetails: {
            chat_link: "",
            default_skin: null,
            details: {
                damage_type: "",
                defense: 0,
                max_power: 1155,
                min_power: 1045,
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
            buy: null,
            sell: null,
            quantity: null
        }
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

    updateData = () => {
        let sellAVGapi = [];
        let quantityAVGapi = [];
        let i = 0;
        let tempMonth = 11;
        let tempResultsQuantity = 0;
        let tempResultsValue = 0;
        let tempItemQuantity = 0;
        let currentYear = 2018;
        while (i < this.state.rawData.length) {
            let year = parseInt(this.state.rawData[i].listing_datetime.substr(0, 4), 10);
            let month = parseInt(this.state.rawData[i].listing_datetime.substr(5, 7), 10) - 1;

            if (currentYear !== year) {
                i++;
                if (i === this.state.rawData.length) {
                    this.setState({
                        sellAVG: sellAVGapi,
                        quantity: quantityAVGapi
                    });
                }
            } else {
                if (tempMonth !== month) {
                    tempMonth = month;
                    if (tempResultsQuantity === 0) {
                        sellAVGapi.push({
                            x: new Date(year, tempMonth),
                            y: 0
                        });
                        quantityAVGapi.push({
                            x: new Date(year, tempMonth),
                            y: 0
                        })
                    } else {
                        sellAVGapi.push({
                            x: new Date(year, tempMonth),
                            y: tempResultsValue / tempResultsQuantity
                        });
                        quantityAVGapi.push({
                            x: new Date(year, tempMonth),
                            y: tempItemQuantity / tempResultsQuantity
                        })
                    }

                }
                tempResultsQuantity++;
                tempResultsValue += this.state.rawData[i].unit_price;
                tempItemQuantity += this.state.rawData[i].quantity;
                i++;
                if (i === this.state.rawData.length) {
                    sellAVGapi.push({
                        x: new Date(year, tempMonth),
                        y: tempResultsValue / tempResultsQuantity
                    });
                    this.setState({
                        sellAVG: sellAVGapi,
                        quantity: quantityAVGapi
                    });
                }
            }
        }

    };

    async getData() {

        const {id} = this.props.match.params;

        let itemData = [];
        let promises = [];

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


    }

    componentDidMount() {
        const {id} = this.props.match.params;

        if (typeof (this.props.location.state) === 'undefined') {
            console.log('empty');
            axios.get('https://api.guildwars2.com/v2/items?ids=' + id + '&lang=en')
                .then(res => {
                    console.log(res.data[0]);
                    this.setState({
                        itemDetails: res.data[0]
                    });
                })
        } else {
            this.setState({
                itemDetails: this.props.location.state.details
            });
        }

        this.getData();
    }

    render() {
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
                titleFontColor: "#51CDA0",
                lineColor: "#51CDA0",
                labelFontColor: "#51CDA0",
                tickColor: "#51CDA0",
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
                type: "area",
                name: "Sell Offers Avg",
                markerBorderColor: "white",
                markerBorderThickness: 2,
                showInLegend: true,
                yValueFormatString: "$#,##0",
                dataPoints: this.state.sellAVG
            }]
        };
        return (
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
                                                <td>{this.state.price.buy}</td>
                                            </tr>
                                            <tr>
                                                <th>Sell:</th>
                                                <td>{this.state.price.sell}</td>
                                            </tr>
                                            <tr>
                                                <th>Quantity:</th>
                                                <td>{this.state.price.quantity}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <CanvasJSChart options={options} onRef={ref => this.chart = ref}/>
                            </Grid>
                        </Grid>
                    </Card>
                </Box>
            </Grid>
        );
    }
}

export default ItemDetails;

// todo
// 1. Check if param undefined and then axios.get() else skip
// 2. Change request id from props to route param