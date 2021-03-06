import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = { userName: "" };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(event) {
        let url;
        if (process.env.NODE_ENV === "development")
            url = "http://192.168.1.172:8081/users/login"
        else if (process.env.NODE_ENV === "production")
            url = "https://time-talking-app.herokuapp.com/users/login/"
        fetch(url, {
            method: 'POST', credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName: this.state.userName })
        })
            .then((response) => {
                return response.ok
                    ? response.json()
                        .then((data) => {
                            this.props.initWebSocket();

                            console.log(data);
                        })
                    : Promise.reject(new Error('Unexpected response'));
            })
            .then((message) => console.log(message))
            .catch(function (err) {
                console.error(err.message);
            });


        event.preventDefault();
    }

    onChange(event) {
        this.setState({
            userName: event.target.value
        },
            () => {
               this.props.setUserName(this.state.userName);
            })
    }

    render() {
        return (
            <header>
                <h1>Login</h1>
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="input">Your name</label>
                    <input onChange={this.onChange} type="text" />
                    <input type="submit" value="Login" />
                </form>
            </header>
        )
    }
}