import React, {Component, Fragment} from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import Plus from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper/Paper';
import "./CreateChannel.css";


class CreateChannel extends Component {

    constructor(props) {
        super(props);
        this.state ={
            newChannelName: "",
        };
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addChannel(null, this.state.newChannelName);
        this.setState({
            newChannelName: "",
        })
    };

    handleChange = (event) => {
        this.setState({
            newChannelName: event.target.value
        })
    };

    render() {
        return (
            <div className={"CreateChannel-root"}>
                <Paper className={"CreateChannel-paper"}>
                    <Grid container direction={"row"} alignItems={"center"}>
                        <Grid item><form onSubmit={this.handleSubmit}><input placeholder={"Create new channel"} onChange={this.handleChange} value={this.state.newChannelName} type={"text"} className={"CreateChannel-text"}/></form></Grid>
                        <Grid item><Plus className={"CreateChannel-plus"}/></Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }
}

export default CreateChannel;