import React, {Component, Fragment} from 'react';
import "./ChatComponentItem.css";


class ChatComponentItem extends Component {

    constructor(props) {
        super(props);
        this.state ={

        };
    }

    render() {
        return (
            <div className={"ChatComponentItem-root"}>
                <div className={"ChatComponentItem-user"}>{this.props.name}</div>
                <div className={"ChatComponentItem-massage"}>{this.props.message}</div>
            </div>
        )
    }
}

export default ChatComponentItem;