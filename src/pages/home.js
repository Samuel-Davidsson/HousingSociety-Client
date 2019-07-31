import Grid from "@material-ui/core/Grid";
import axios from "axios";
import React, { Component } from 'react';
import Post from "../components/Post";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

class home extends Component {
    state = {
        posts: null
    }
    componentDidMount() {
        axios.get("/posts")
        .then(res => {
            this.setState({
                posts: res.data
            })
        })
        .catch(err => console.log(err));
    };

    render() {
        dayjs.extend(relativeTime);
        let recentPostMarkup = this.state.posts ? (
            this.state.posts.map(post => <Post key={post.postId} post={post} formatDate={dayjs}/>)
        ) : <p>Loading..</p>
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                {recentPostMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                <p>Profile...</p>
                </Grid>
            </Grid>
        );
    }
}
export default home;