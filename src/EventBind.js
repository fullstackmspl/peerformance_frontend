import React, {Component} from 'react';

class EventBind extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: 'Hello'
        }

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        this.setState({
            message: "GoodBye"
        })

        console.log(this)
    }

    render() {
        return (
            <div>
                {/*<p onClick={this.clickHandler.bind(this)}> {this.state.message}</p>*/}
                {/*<p onClick={() => this.clickHandler()}> {this.state.message}</p>*/}
                <p onClick={this.clickHandler}> {this.state.message}</p>

            </div>
        )
    }
}

export default EventBind;