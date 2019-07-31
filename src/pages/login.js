import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import AppIcon from "../images/house.png";

const styles = {
    form: {
        textAlign: "center"
    },
    image: {
        margin: "20px, auto, 20px, auto"
    },
    pageTitle: {
        margin: "10px, auto, 10px, auto"
    },
    textField: {
        margin: "10px, auto, 10px, auto"
    },
    button: {
        marginTop: 20,
        position: "relative"
    },
    customError: {
        color: "red",
        fontSize: "0.8rem",
        marginTop: 10
    },
    progress: {
        position: "absolute"
    }

}

class login extends Component {

    state = {
        email: "",
        password: "",
        loading: false,
        errors: {}
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const userData = {
           email: this.state.email,
           password: this.state.password 
        };

        axios.post("/login", userData)
        .then(res => {
            console.log(res.data);
            this.setState({
                loading: false
            });
            this.props.history.push("/")   
        })
        .catch(err => {
            console.log(err.response.data);
            this.setState({
                errors: err.response.data,
                loading: false
            })
        })       
    };
    render() {
        const { classes } = this.props;
        const {errors, loading} = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="Housing" className={classes.image} />
                    <Typography variant="h3" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email" className={classes.textField}
                        value={this.state.email}
                        onChange={this.handleChange}    
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        fullWidth
                        />
                        <TextField id="password" name="password" type="password" label="Password" className={classes.textField}
                        value={this.state.password}   
                        onChange={this.handleChange}                  
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        fullWidth
                          />
                          {errors.general && (
                              <Typography variant="body2" className={classes.customError}>
                                  {errors.general}
                              </Typography>
                          )}
                          <Button disabled={loading} type="submit" variant="contained" color="primary" className={classes.button}>
                              Login
                              {loading && (
                                  <CircularProgress size={20} className={classes.progress}/>
                              )}
                          </Button>
                          <br/>
                          <small>Dont have an account ? sign up <Link to="/signup">here</Link></small>
                    </form>
                    </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login);