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

class Item extends Component {
    state = {
        sellAVG: [],
        buyAVG: [],
        quantity: [],
        selectYear: 2019,
        rawData: []
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
        console.log(this.state.rawData);
        let sellAVGapi = [];
        let quantityAVGapi = [];
        let i = 0;
        let tempMonth = 11;
        let tempResultsQuantity = 0;
        let tempResultsValue = 0;
        let tempItemQuantity = 0;
        let currentYear = 2018;
        while (i < this.state.rawData.length) {
            let year = parseInt(this.state.rawData[i].listing_datetime.substr(0, 4));
            let month = parseInt(this.state.rawData[i].listing_datetime.substr(5, 7)) - 1;

            if (currentYear !== year) {
                i++;
                if (i === this.state.rawData.length) {
                    console.log('end if');
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
                    console.log('end else');
                    this.setState({
                        sellAVG: sellAVGapi,
                        quantity: quantityAVGapi
                    });
                }
            }
        }

    };

    async getData() {
        let itemData = [];
        let promises = [];

        axios.get('http://www.gw2spidy.com/api/v0.9/json/listings/' + this.props.details.id + '/sell')
            .then(res => {
                itemData = res.data.results;
                if (parseInt(res.data.last_page) > 1) {
                    for (let i = 2; i < res.data.last_page + 1; i++) {
                        promises.push(axios.get('http://www.gw2spidy.com/api/v0.9/json/listings/' + this.props.details.id + '/sell/' + i)
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
        let quantity = [
            {x: new Date(2019, 0), y: 30},
            {x: new Date(2019, 1), y: 40},
            {x: new Date(2019, 2), y: 50},
            {x: new Date(2019, 3), y: 40},
            {x: new Date(2019, 4), y: 30},
            {x: new Date(2019, 5), y: 37},
            {x: new Date(2019, 6), y: 32},
            {x: new Date(2019, 7), y: 27},
            {x: new Date(2019, 8), y: 29},
            {x: new Date(2019, 9), y: 43},
            {x: new Date(2019, 10), y: 55},
            {x: new Date(2019, 11), y: 39}
        ];

        let buyAVG = [
            {x: new Date(2019, 0), y: 38000},
            {x: new Date(2019, 1), y: 39000},
            {x: new Date(2019, 2), y: 35000},
            {x: new Date(2019, 3), y: 37000},
            {x: new Date(2019, 4), y: 42000},
            {x: new Date(2019, 5), y: 48000},
            {x: new Date(2019, 6), y: 41000},
            {x: new Date(2019, 7), y: 38000},
            {x: new Date(2019, 8), y: 42000},
            {x: new Date(2019, 9), y: 45000},
            {x: new Date(2019, 10), y: 48000},
            {x: new Date(2019, 11), y: 47000}
        ];

        let sellAVG = [
            {x: new Date(2019, 0), y: 11500},
            {x: new Date(2019, 1), y: 10500},
            {x: new Date(2019, 2), y: 9000},
            {x: new Date(2019, 3), y: 13500},
            {x: new Date(2019, 4), y: 13890},
            {x: new Date(2019, 5), y: 18500},
            {x: new Date(2019, 6), y: 16000},
            {x: new Date(2019, 7), y: 14500},
            {x: new Date(2019, 8), y: 15880},
            {x: new Date(2019, 9), y: 24000},
            {x: new Date(2019, 10), y: 31000},
            {x: new Date(2019, 11), y: 19000}
        ];

        this.getData();

        this.setState({
            sellAVG,
            buyAVG,
            quantity
        })
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
                                        {this.props.details.name}
                                        <img className="image" src={this.props.details.icon} />
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
                                        <tr>
                                            <th>Rarity:</th>
                                            <td>{this.props.details.rarity}</td>
                                        </tr>
                                        <tr>
                                            <th>Type:</th>
                                            <td>{this.props.details.type} - {this.props.details.details.type}</td>
                                        </tr>
                                        <tr>
                                            <th>Damage:</th>
                                            <td>{this.props.details.details.min_power} - {this.props.details.details.max_power}</td>
                                        </tr>
                                        <tr>
                                            <th>Level:</th>
                                            <td>{this.props.details.level}</td>
                                        </tr>
                                        <tr>
                                            <th>Chat Link:</th>
                                            <td>{this.props.details.chat_link}</td>
                                        </tr>
                                        <tr>
                                            <th>Buy:</th>
                                            <td>{this.props.price.buy}</td>
                                        </tr>
                                        <tr>
                                            <th>Sell:</th>
                                            <td>{this.props.price.sell}</td>
                                        </tr>
                                        <tr>
                                            <th>Quantity:</th>
                                            <td>{this.props.price.quantity}</td>
                                        </tr>
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

export default Item;