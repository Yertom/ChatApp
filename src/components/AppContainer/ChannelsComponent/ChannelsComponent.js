import React, {Component, Fragment} from 'react';
import "./ChannelsComponent.css"
import ChannelsComponentItem from "./ChannelsComponentItem/ChannelsComponentItem";

class ChannelsComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let channels = this.props.channelsList.map((value) => {
            return <ChannelsComponentItem changeChannel={this.props.changeChannel}
                                          isSelected={this.props.currentChannelId === value.id} name={value.name}
                                          id={value.id} key={value.id}/>
        });
        return (
            <div className={"ChannelsComponent-root"}>
                <h1 className={"ChannelsComponent-heading"}>Your Channels:</h1>
                {channels}
            </div>
        )
    }
}

export default ChannelsComponent;
