import Grid from "@material-ui/core/Grid";
import React, { Component } from 'react';
import Post from "../components/Post";
import Profile from "../components/Profile";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";

class home extends Component {
    componentDidMount() {
        this.props.getPosts();
    };
    render() {
        const { posts, loading} = this.props.data;
        dayjs.extend(relativeTime);
        let recentPostMarkup = !loading ? (
            posts.map(post => <Post key={post.postId} post={post} formatDate={dayjs}/>)
        ) : (
            <p>Loading..</p>
        );
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                {recentPostMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                <Profile />
                </Grid>
            </Grid>
        );
    }
};

home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, { getPosts })(home);