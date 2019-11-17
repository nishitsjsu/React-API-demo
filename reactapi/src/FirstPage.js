import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default class MyComponent extends Component {
    state = {
        error: null,
        isLoaded: false,
        items: []
    };

    componentDidMount() {
        axios.get("http://localhost:12345/people").then(
            result => {
                this.setState({
                    isLoaded: true,
                    items: result.data
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <ul>
                        {items.map(item => (
                            <li key={item._id}>
                                {item.firstname}: {item.lastname}
                            </li>
                        ))}
                    </ul>
                    <Link to={`/viewcart`} > <button class="btn btn-success" type="submit">View Cart</button></Link>
                </div>
            );
        }
    }
}