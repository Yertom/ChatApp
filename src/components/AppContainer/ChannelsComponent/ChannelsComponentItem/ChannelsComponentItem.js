import React, {Component, Fragment} from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import "./ChannelsComponentItem.css";

class ChannelsComponentItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div onClick={(e)=>{this.props.changeChannel(this.props.id, e)}}>
                <Grid container direction={"column"}>
                    <Grid item>{<p className={this.props.isSelected ? "ChannelsComponent-container_active" : "ChannelsComponent-item"}>{"#" + this.props.name}</p>}</Grid>
                </Grid>
            </div>
        )
    }
}

export default ChannelsComponentItem;