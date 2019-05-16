import React, {Component, Fragment} from 'react';
import ChatComponentItem from "./ChatComponentItem/ChatComponentItem";
import Chatkit from '@pusher/chatkit-client';
import "./ChatComponent.css"
import ConfigFile from "../../../config/config";

class ChatComponent extends Component {

    constructor(props) {
        super(props);
        this.state ={

        };
    }

    componentDidMount(){

    }

    render() {
        let messages = this.props.currentMessages.map((value)=>{
            return <ChatComponentItem key={value.id} name={value.senderId} message={value.parts["0"].payload.content}/>
        });
        return (
            <div className={"ChatComponent-root"}>
                {messages}
            </div>
        )
    }
}

export default ChatComponent;