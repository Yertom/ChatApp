import React, {Component, Fragment} from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Chatkit from '@pusher/chatkit-client';
import ConfigFile from '../../config/config';
import ChannelsComponent from "./ChannelsComponent/ChannelsComponent";
import InputComponent from "./InputComponent/InputComponent";
import CreateChannel from "./CreateChannel/CreateChannel";
import ChatComponent from "./ChatComponent/ChatComponent";
import Header from "./Header/Header";


class AppContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            channelsList: [],
            currentChannelId: 0,
            currentUserId: "",
            currentMessages: [],
        };
    }

    componentDidMount() {
        const tokenProvider = new Chatkit.TokenProvider({
            url: ConfigFile.tokenEndpoint
        });

        const chatManager = new Chatkit.ChatManager({
            instanceLocator: ConfigFile.InstanceLocator,
            userId: `${this.props.match.params.user}`,
            tokenProvider: tokenProvider
        });

        chatManager
            .connect()
            .then(currentUser => {
                this.currentUser = currentUser;
                this.getChannels();
                this.changeChannel();
            })
            .catch(error => {
                console.error("error:", error);
            });
    }

    getChannels = () => {
        let newRoomList = [];
        this.currentUser.getJoinableRooms()
            .then((rooms)=>{
                this.setState({channelsList: newRoomList.concat(this.currentUser.rooms, rooms),})
            });
    };

    changeChannel = (channelId) => {
        let newArr = [];

        if (this.state.currentChannelId){
            this.currentUser.roomSubscriptions[this.state.currentChannelId].cancel();
        }

        this.setState({
            currentChannelId: channelId,
            currentUserId: this.currentUser.encodedId,
            currentMessages: [],
        });

        if (this.state.currentMessages.length === 10 && channelId === this.state.currentChannelId){
            newArr = Array.from(this.state.currentMessages);
        }

            this.currentUser.subscribeToRoomMultipart({
                roomId: channelId,
                hooks: {
                    onMessage: message => {
                        if (newArr.length === 10) {
                            newArr.shift();
                        }
                        newArr.push(message);
                        this.setState({
                            currentMessages: newArr,
                            currentChannelId: channelId,
                        });
                        let chatComponentScroll = document.getElementsByClassName("ChatComponent-root");
                        chatComponentScroll[0].scrollTop += 1000;
                    }
                },
                messageLimit: 10,
            });
    };

    addChannel = (event, name) => {
        this.currentUser.createRoom({
            name,
        })
            .then((room)=>{
                this.getChannels();
                this.changeChannel(room.id);
            })
            .catch(error => {
            console.error("error:", error);
        });
    };

    sendMessage = (event, message) => {
        this.currentUser.sendSimpleMessage({
            text: message,
            roomId: this.state.currentChannelId
        });
    };

    render() {
        let inputStyle = {
            marginLeft: '10px',
        };

        return (
            <Fragment>
                <Header currentUserId={this.state.currentUserId}/>
                <Grid container direction={"row"} wrap={"nowrap"}>
                    <Grid item><ChannelsComponent changeChannel={this.changeChannel} currentChannelId={this.state.currentChannelId} channelsList={this.state.channelsList}/></Grid>
                    <Grid item xs={12}><ChatComponent currentMessages={this.state.currentMessages}/></Grid>
                </Grid>
                <Grid container direction={"row"} alignContent={"center"} alignItems={"center"} wrap={"nowrap"}>
                    <Grid item><CreateChannel addChannel={this.addChannel}/></Grid>
                    <Grid item xs={12} style={inputStyle}><InputComponent isNoChannel={this.state.currentChannelId} sendMessage={this.sendMessage}/></Grid>
                </Grid>
            </Fragment>
        )
    }
}

export default AppContainer;
