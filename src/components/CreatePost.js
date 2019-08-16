import { Dialog, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { clearErrors, createPost } from "../redux/actions/dataActions";
import MyButton from "../util/MyButton";
import theme from "../util/theme";



const styles = theme;

class CreatePost extends Component {
    state = {
        open: false,
        body: "",
        errors: {}
    };

     static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.UI.errors) {
        return { errors: nextProps.UI.errors }
        }
        else
            return { errors: {}};
      };

    handleClose = () => {
        this.props.clearErrors();
        this.setState({
            open: false,
            errors: {}
        })
    };

    handleOpen = () => {
        this.setState({
            open: true
        })
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.createPost({ body: this.state.body });
        if(this.props.UI.errors === null) return;
        this.handleClose();
    };

    render() {
        const { errors } = this.state;
        const { classes, UI: {loading}} = this.props;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Create a Post">
                    <AddIcon />
                    </MyButton>   
                    <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                        <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                            <CloseIcon />
                        </MyButton>
                        <DialogTitle>Create a new post</DialogTitle>
                        <DialogContent>
                            <form 
                            onSubmit={this.handleSubmit}>
                            <TextField
                            name="body"
                            type="text"
                            label="Post"
                            multiline
                            rows="3"
                            placeholder="Create a new post"
                            error={errors.body ? true : false}
                            helperText={errors.body}
                            className={classes.textField}
                            onChange={this.handleChange}
                            fullWidth
                            />

                            <Button type="submit" variant="contained" color="primary"
                            className={classes.submitButton} disabled={loading}>
                                Submit
                                {loading && (
                                    <CircularProgress size={30} className={classes.progress} />
                                )
                                }
                            </Button>
                            </form>
                        </DialogContent>
                        </Dialog>       
            </Fragment>
        )
    }
}

CreatePost.propTypes = {
    createPost: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    UI: state.UI
});

export default connect( mapStateToProps,{ createPost, clearErrors })(withStyles(styles)(CreatePost));

