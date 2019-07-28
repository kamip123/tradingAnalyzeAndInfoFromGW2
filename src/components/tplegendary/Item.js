import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";

class Item extends Component {
    componentDidMount() {
        console.log(this.props.price);
    }
    render() {
        return (
            <Grid item xs={12} sm={6}>
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
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <Box p={1} m={1}>
                                            <NavLink to={{
                                                pathname: '/legendary/' + this.props.details.id,
                                                state: {
                                                    details: this.props.details,
                                                    price: this.props.price
                                                }
                                            }} style={{textDecoration: 'none', color: 'black'}}>

                                                <Typography variant="h4" align="center">
                                                    {this.props.details.name}
                                                </Typography>
                                            </NavLink>
                                        </Box>
                                        <NavLink to={{
                                            pathname: '/legendary/' + this.props.details.id,
                                            state: {
                                                details: this.props.details,
                                                price: this.props.price
                                            }
                                        }} style={{textDecoration: 'none', color: 'black'}}>
                                            <img className="image" src={this.props.details.icon} alt="icon"/>
                                        </NavLink>

                                    </Grid>
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
                                            <td>{this.props.price.buys.unit_price}</td>
                                        </tr>
                                        <tr>
                                            <th>Sell:</th>
                                            <td>{this.props.price.sells.unit_price}</td>
                                        </tr>
                                        <tr>
                                            <th>Quantity:</th>
                                            <td>{this.props.price.sells.quantity}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Box>
            </Grid>
        );
    }
}

export default Item;