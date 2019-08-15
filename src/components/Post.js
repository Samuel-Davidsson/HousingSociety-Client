import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import PropTypes from "prop-types";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { likePost, unlikePost } from "../redux/actions/dataActions";
import MyButton from '../util/MyButton';

const styles = {
    card: {
        display: "flex",
        marginBottom: 20,

    },
    image: {
        minWidth: 200
    },
    content:{
        padding: 25,
        objectFit: "cover",
    }
};

const Post = props => {

    const likedPost = () => {
      if (
        props.user.likes &&
        props.user.likes.find(
          (like) => like.postId === props.post.postId
        )
      )
        return true;
      else return false;
    };
    const likePost = () => {
      props.likePost(props.post.postId);
    };
    const unlikePost = () => {
      props.unlikePost(props.post.postId);
    };
      dayjs.extend(relativeTime);
      const {
        classes,
        post: {
          body,
          createdAt,
          userImage,
          userHandle,
          postId,
          likeCount,
          commentCount
        },
        user: { authenticated }
      } = props;
      const likeButton = !authenticated ? (
        <MyButton tip="Like">
          <Link to="/login">
            <FavoriteBorder color="primary" />
          </Link>
        </MyButton>
      ) : likedPost() ? (
        <MyButton tip="Undo like" onClick={unlikePost}>
          <FavoriteIcon color="primary" />
        </MyButton>
      ) : (
        <MyButton tip="Like" onClick={likePost}>
          <FavoriteBorder color="primary" />
        </MyButton>
      );
      return (
        <Card className={classes.card}>
          <CardMedia
            image={userImage}
            title="Profile image"
            className={classes.image}
          />
          <CardContent className={classes.content}>
            <Typography
              variant="h5"
              component={Link}
              to={`/users/${userHandle}`}
              color="primary"
            >
              {userHandle}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
            <Typography variant="body1">{body}</Typography>
            {likeButton}
            <span>{likeCount} Likes</span>
            <MyButton tip="comments">
              <ChatIcon color="primary" />
            </MyButton>
            <span>{commentCount} comments</span>
          </CardContent>
        </Card>
      );
    }
Post.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = {
    likePost,
    unlikePost
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post));

