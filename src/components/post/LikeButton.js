import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import PropTypes from "prop-types";
import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { likePost, unlikePost } from "../../redux/actions/dataActions";
import MyButton from "../../util/MyButton";



const LikeButton = props => {

    const likedPost= () => {
      if (
        props.user.likes &&
        props.user.likes.find(
          (like) => like.postId === props.postId
        )
      )
        return true;
      else return false;
    };
    const likePost= () => {
      props.likePost(props.postId);
    };
    const unlikePost = () => {
      props.unlikePost(props.postId);
    };
      const { authenticated } = props.user;
      const likeButton = !authenticated ? (
        <Link to="/login">
          <MyButton tip="Like">
            <FavoriteBorder color="primary" />
          </MyButton>
        </Link>
      ) : likedPost() ? (
        <MyButton tip="Undo like" onClick={unlikePost}>
          <FavoriteIcon color="primary" />
        </MyButton>
      ) : (
        <MyButton tip="Like" onClick={likePost}>
          <FavoriteBorder color="primary" />
        </MyButton>
      );
      return likeButton;
    };
  
  LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({
    user: state.user
  });
  
  const mapActionsToProps = {
    likePost,
    unlikePost
  };
  
  export default connect( mapStateToProps, mapActionsToProps)(LikeButton);
