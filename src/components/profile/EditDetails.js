import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import withStyles from "@material-ui/core/styles/withStyles";
import EditIcon from "@material-ui/icons/Edit";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";
import theme from "../../util/theme";
import MyButton from "../../util/MyButton";



const styles = theme;

class EditDetails extends Component{
    state = {
        bio: "",
        website: "",
        location: "",
        open: false
    };

    handleOpen = () => {
        this.setState({
            open: true
        });
        this.mapUserDetailsToState(this.props.credentials);
    };

    handleClose = () => {
        this.setState({open: false});
    };

    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            location: this.state.location,
            website: this.state.website
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    };

    mapUserDetailsToState = credentials => {
        this.setState({
            bio: credentials.bio ? credentials.bio : "",
            website: credentials.bio ? credentials.website : "", 
            location: credentials.bio ? credentials.location : "", 
        });
    } 

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton tip="Edit details" onClick={this.handleOpen} btnClassName={classes.editbutton}>
                    <EditIcon color="primary" />
                </MyButton>
                <Dialog open={this.state.open}               
                onClose={this.handleClose} 
                fullWidth maxWidth="sm">
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField 
                            name="bio" 
                            type="text" 
                            label="Bio" 
                            multiline row="3" 
                            placeholder="A short bio about yourself."
                            className={classes.textField}
                            value={this.state.bio}
                            onChange={this.handleChange}
                            fullWidth>
                            </TextField>
                            <TextField 
                            name="website" 
                            type="text" 
                            label="Website" 
                            placeholder="Your personal website."
                            className={classes.textField}
                            value={this.state.website}
                            onChange={this.handleChange}
                            fullWidth>
                            </TextField>
                            <TextField 
                            name="location" 
                            type="text" 
                            label="Location" 
                            placeholder="Where you live."
                            className={classes.textField}
                            value={this.state.location}
                            onChange={this.handleChange}
                            fullWidth>
                            </TextField>
                        </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleSubmit} color="primary">
                                Save
                            </Button>
                            </DialogActions> 
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
