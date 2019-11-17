import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import MyComponent from "./FirstPage";
import { Redirect } from 'react-router';
import PersonList from "./post";

//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}

                <Route path="/" component={MyComponent} />
                <Route path="/post" component={PersonList} />

            </div>
        );
    }
}
//Export The Main Component
export default Main;
