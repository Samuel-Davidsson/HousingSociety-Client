import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import PropTypes from "prop-types";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MyButton from '../util/MyButton';
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";
import LikeButton from './LikeButton';

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
    user: { authenticated, credentials: { handle } }
  } = props;

   
    const deleteButton = authenticated && userHandle === handle ? (
        <DeletePost postId={postId} />
    ) : null;

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
            {deleteButton}
            <LikeButton postId={postId} />
            <span>{likeCount} Likes</span>
            <MyButton tip="comments">
              <ChatIcon color="primary" />
            </MyButton>
            <span>{commentCount} comments</span>
            <PostDialog postId={postId} userHandle={userHandle} />
          </CardContent>
        </Card>
      );
    };

Post.propTypes = {
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});


export default connect(mapStateToProps)(withStyles(styles)(Post));

