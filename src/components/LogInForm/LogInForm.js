import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from "react-router-dom";
import Chatkit from "@pusher/chatkit-client/dist/web/chatkit";
import ConfigFile from "../../config/config";
import "./LogInForm.css";
import MessageComponent from "../ReusableComponents/MessageComponent/MessageComponent";

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});


class LogInForm extends Component {

    constructor(props) {
        super(props);
        this.state ={
            username:"",
        };

    }

    handleChange = (event) => {
        let target = event.target.name;
        this.setState({[target]: event.target.value})
    };

    render() {
        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <MessageComponent message={"Available Usernames: User1, User2!"} style={"info"}/>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Username</InputLabel>
                            <Input onChange={this.handleChange} value={this.state.username} id="email" name="username" autoComplete="name" autoFocus />
                        </FormControl>
                        <Link  className={"LogInForm-link"} to={`/${this.state.username == "User1"? "User1" : this.state.username == "User2"? "User2" : ''}`}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign in
                            </Button>
                        </Link>
                    </form>
                </Paper>
            </main>
        );
    }
}

LogInForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LogInForm);