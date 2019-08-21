import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/house.png';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import theme from "../util/theme";
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = theme;

class login extends Component {

    state = {
        email: "",
        password: "",
        errors: {}
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.UI.errors) {
          return ({ errors: nextProps.UI.errors});
        }
        else return null;
      };

    handleSubmit = event => {
        event.preventDefault();
        const userData = {
           email: this.state.email,
           password: this.state.password 
        };    
        this.props.loginUser(userData, this.props.history);
    };
    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors }  = this.state

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
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));