import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Container from "@material-ui/core/Container";
import Footer from "./components/layout/Footer";
import TemporaryDrawer from "./components/layout/Drawer";
import {Route} from "react-router-dom";

import Home from "./components/home/Home";
import WBossList from "./components/wboss/WBossList";
import TradeList from "./components/tplegendary/TradeList";
import NewPlanner from "./components/planner/NewPlanner";
import PlannerList from "./components/planner/PlannerList";
import PlannerDetails from "./components/planner/PlannerDetails";
import DailyList from "./components/daily/DailyList";
import SignIn from "./components/auth/SignIn";
import LogOut from "./components/auth/LogOut";
import Register from "./components/auth/Register";
import ItemDetails from "./components/tplegendary/ItemDetails";
import yourProfile from "./components/profile/YourProfile";
import EditBio from "./components/profile/EditBio";
import EditPassword from "./components/profile/EditPassword";
import EditEmail from "./components/profile/EditEmail";
import UserProfile from "./components/profile/UserProfile";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="backgroundImageFull">
                    <Container maxWidth="lg">
                        <Navbar/>
                        <TemporaryDrawer/>

                        <Route exact path='/' component={Home}/>
                        <Route exact path='/register' component={Register}/>
                        <Route exact path='/login' component={SignIn}/>
                        <Route exact path='/logout' component={LogOut}/>
                        <Route exact path='/daily' component={DailyList}/>
                        <Route exact path='/plans' component={PlannerList}/>
                        <Route exact path='/plans/:id' component={PlannerDetails}/>
                        <Route exact path='/newplan' component={NewPlanner}/>
                        <Route exact path='/legendary' component={TradeList}/>
                        <Route exact path='/legendary/:id' component={ItemDetails}/>
                        <Route exact path='/boss' component={WBossList}/>
                        <Route exact path='/profile' component={yourProfile}/>
                        <Route exact path='/profile/editBio' component={EditBio}/>
                        <Route exact path='/profile/editPassword' component={EditPassword}/>
                        <Route exact path='/profile/editEmail' component={EditEmail}/>
                        <Route exact path='/profiles/:id' component={UserProfile}/>
                        <Footer/>
                    </Container>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
