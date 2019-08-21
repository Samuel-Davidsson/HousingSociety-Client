import { CircularProgress, Dialog, DialogContent, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import ChatIcon from "@material-ui/icons/Chat";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPost, clearErrors } from "../../redux/actions/dataActions";
import MyButton from "../../util/MyButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import theme from "../../util/theme";
import LikeButton from "./LikeButton";

const styles = theme;

 class PostDialog extends Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true });
        this.props.getPost(this.props.postId);
    };

    handleClose = () => {
        this.setState({ open: false });
        this.props.clearErrors();
    };

    render() {
        const { classes, post: {postId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments }, UI: { loading }} = this.props;
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
            <CircularProgress size={200} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={12}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage} />
                </Grid>
                <Grid item sm={7}>
                    <Typography
                    component={Link}
                    color="primary"
                    variant="h5"
                    to={`/users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton postId={postId} />
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                    <ChatIcon color="primary" />
                    </MyButton>
                     <span>{commentCount} comments</span>
                </Grid>
                <hr className={classes.visableSeparator} />
                <CommentForm postId={postId} />
                <Comments comments={comments} />
            </Grid>
        );
        return(
            <Fragment>
              <MyButton onClick={this.handleOpen} tip="Expand post" tipClassName={classes.expandButton}>
                <UnfoldMore color="primary" />
            </MyButton>
            <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                <CloseIcon />
                </MyButton>
                <DialogContent className={classes.dialogContent}>
                    {dialogMarkup}
                </DialogContent>
             </Dialog>  
            </Fragment>
        )
    }
}




 PostDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getPost: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
 };

 const mapStateToProps = state =>({
     post: state.data.post,
     UI: state.UI
 });

 const mapActionsToProps = {
     getPost,
     clearErrors
 };

 export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog));