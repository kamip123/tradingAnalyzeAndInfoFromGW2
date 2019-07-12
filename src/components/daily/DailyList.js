import {Component} from "react";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Achievement from "./Achievement";
import axios from "axios";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

class DailyList extends Component {

    state = {
        questsPVE: {},
        questsPVP: {},
        questsWVW: {},
        questsFRACTALS: {},
        questsSPECIAL: {},
        questsPVEd: {},
        questsPVPd: {},
        questsWVWd: {},
        questsFRACTALSd: {},
        questsSPECIALd: {},
        value: 0
    };

    componentDidMount() {
        axios.get('https://api.guildwars2.com/v2/achievements/daily')
            .then(res => {
                this.setState({
                    questsPVE: res.data.pve,
                    questsPVP: res.data.pvp,
                    questsWVW: res.data.wvw,
                    questsFRACTALS: res.data.fractals,
                    questsSPECIAL: res.data.special
                });

                for(let i=0;i<this.state.questsPVE.length;i++){
                    if(this.state.questsPVE[i].level.max === 80){
                        axios.get('https://api.guildwars2.com/v2/achievements?ids=' + this.state.questsPVE[i].id + '&lang=en')
                            .then(res => {
                                let questsPVEd = [...this.state.questsPVEd, res.data[0]];
                                this.setState({
                                    questsPVEd: questsPVEd
                                })
                            });
                    }
                }

                for(let i=0;i<this.state.questsPVP.length;i++){
                    if(this.state.questsPVP[i].level.max === 80) {
                        axios.get('https://api.guildwars2.com/v2/achievements?ids=' + this.state.questsPVP[i].id + '&lang=en')
                            .then(res => {
                                let questsPVPd = [...this.state.questsPVPd, res.data[0]];
                                this.setState({
                                    questsPVPd: questsPVPd
                                })
                            });
                    }
                }
                for(let i=0;i<this.state.questsWVW.length;i++){
                    if(this.state.questsWVW[i].level.max === 80) {
                        axios.get('https://api.guildwars2.com/v2/achievements?ids=' + this.state.questsWVW[i].id + '&lang=en')
                            .then(res => {
                                let questsWVWd = [...this.state.questsWVWd, res.data[0]];
                                this.setState({
                                    questsWVWd: questsWVWd
                                })
                            });
                    }
                }
                for(let i=0;i<this.state.questsFRACTALS.length;i++){
                    if(this.state.questsFRACTALS[i].level.max === 80) {
                        axios.get('https://api.guildwars2.com/v2/achievements?ids=' + this.state.questsFRACTALS[i].id + '&lang=en')
                            .then(res => {
                                let questsFRACTALSd = [...this.state.questsFRACTALSd, res.data[0]];
                                this.setState({
                                    questsFRACTALSd: questsFRACTALSd
                                })
                            });
                    }
                }
                for(let i=0;i<this.state.questsSPECIALd.length;i++){
                    if(this.state.questsSPECIALd[i].level.max === 80) {
                        axios.get('https://api.guildwars2.com/v2/achievements?ids=' + this.state.questsFRACTALS[i].id + '&lang=en')
                            .then(res => {
                                let questsSPECIALd = [...this.state.questsSPECIALd, res.data[0]];
                                this.setState({
                                    questsSPECIALd: questsSPECIALd
                                });
                            });
                    }
                }

            }).catch((error) => {
            console.log(error);
        });
    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
    };

    render() {
        let FractalLength = false;
        let PVELength = false;
        let PVPLength = false;
        let WVWLength = false;
        let specialLength = false;

        let fractals = this.state.questsFRACTALSd.length ? (
            this.state.questsFRACTALSd.map(achi => {
                return(<Achievement achi={achi} key={achi.id}/>)
            })
        ) : (
            FractalLength = true
        );

        let pve = this.state.questsPVEd.length ? (
            this.state.questsPVEd.map(achi => {
                return(<Achievement achi={achi} key={achi.id}/>)
            })
        ) : (
            PVELength = true
        );

        let pvp = this.state.questsPVPd.length ? (
            this.state.questsPVPd.map(achi => {
                return(<Achievement achi={achi} key={achi.id}/>)
            })
        ) : (
            PVPLength = true
        );

        let wvw = this.state.questsWVWd.length ? (
            this.state.questsWVWd.map(achi => {
                return(<Achievement achi={achi} key={achi.id}/>)
            })
        ) : (
            WVWLength = true
        );

        let special = this.state.questsSPECIALd.length ? (
            this.state.questsSPECIALd.map(achi => {
                return(<Achievement achi={achi} key={achi.id}/>)
            })
        ) : (
            specialLength = true
        );

        return (
            <Paper square>
                <Tabs value={this.state.value} onChange={this.handleChange} textColor="primary" centered>
                    <Tab label="PVE" disabled={PVELength}/>
                    <Tab label="PVP" disabled={PVPLength}/>
                    <Tab label="WvW" disabled={WVWLength}/>
                    <Tab label="Fractal" disabled={FractalLength}/>
                    <Tab label="Special" disabled={specialLength}/>
                </Tabs>
                <div className="containerDiv">
                    {this.state.value === 0 && <div>{pve}</div>}
                    {this.state.value === 1 && <div>{pvp}</div>}
                    {this.state.value === 2 && <div>{wvw}</div>}
                    {this.state.value === 3 && <div>{fractals}</div>}
                    {this.state.value === 4 && <div>{special}</div>}
                </div>
            </Paper>
        );
    }
}

export default DailyList;