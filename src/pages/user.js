import React, { Component } from 'react'
import PropTypes from "prop-types";
import axios from "axios";
import Post from "../components/post/Post";
import Grid from "@material-ui/core/Grid";
import StaticProfile from "../components/profile/StaticProfile";
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
    state = {
      profile: null,
      postId: null,
    };
    componentDidMount() {
      const handle = this.props.match.params.handle;
      const postId = this.props.match.params.postId;

      if(postId) this.setState({ postId: postId })
      this.props.getUserData(handle);
      axios
        .get(`/user/${handle}`)
        .then((res) => {
          this.setState({
            profile: res.data.user,
            posts: res.data.posts
          });
        })
        .catch((err) => console.log(err));
    }
    render() {
      const { loading, posts } = this.props.data;
      const { postId } = this.state;
      const postsMarkup = loading ? (
        <p>Loading data...</p>
      ) : posts === null ? (
        <p>No posts from this user</p>
      ) : !postId ? (
        posts.map(post => <Post key={post.postId} post={post} />)
      ) : (
        posts.map(post => {
          if(post.postId !== postId)
          return <Post key={post.postId} post={post} />
          else return <Post key={post.postId} post={post} openDialog />
        })
      )
      return (
        <Grid container spacing={16}>
          <Grid item sm={8} xs={12}>
            {postsMarkup}
          </Grid>
          <Grid item sm={4} xs={12}>
            {this.state.profile === null ? (
              <p>Loading profile...</p>
            ) : (
              <StaticProfile profile={this.state.profile} />
            )}
          </Grid>
        </Grid>
      );
    }
  }
  
  user.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    data: state.data
  });
  
  export default connect(mapStateToProps,{ getUserData })(user);
