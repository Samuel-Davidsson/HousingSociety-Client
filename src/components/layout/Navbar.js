import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import PropTypes from "prop-types";
import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MyButton from "../../util/MyButton";
import SubmitPost from "../post/CreatePost";
import Notifications from "./Notifications";


const Navbar = props => {
    const authenticated = props.authenticated;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    { authenticated ? (
                          <Fragment>
                              <SubmitPost />
                              <Link to="/">
                              <MyButton tip="Home">
                                  <HomeIcon />
                              </MyButton>
                              </Link>
                                <Notifications />
                          </Fragment>  
                    ) : (
                <Fragment>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                </Fragment>           
                    )}
                </Toolbar>
            </AppBar>
        );
};

Navbar.propTypes = {
    authenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);