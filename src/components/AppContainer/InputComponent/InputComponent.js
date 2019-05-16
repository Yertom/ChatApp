import React, {Component, Fragment} from 'react';
import Input from '@material-ui/core/Input';

class InputComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: "",
        }
    }

    changeHandle = (event) => {
        this.setState({
            message: event.target.value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.message.trim()){
            this.props.sendMessage(null, this.state.message);
        }
        this.setState({
            message: "",
        });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Input placeholder={"Type message and hit ENTER"} disabled = {!this.props.isNoChannel} onChange={this.changeHandle} value={this.state.message} type={"text"} fullWidth={true} />
                </form>
            </div>
        )
    }
}

export default InputComponent;