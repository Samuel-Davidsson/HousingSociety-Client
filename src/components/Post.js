import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";

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
}
const Post = props => {
        const { classes, post : {body, createdAt, userImage, userHandle, postId, likeCount, commentCount} } = props;
        return(
            <Card className={classes.card}>
                <CardMedia
                className={classes.image}
                image={userImage}
                title="Profile image"/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" color="primary" component={Link} to={`users/${userHandle}`}>{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">{props.formatDate(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                </CardContent>
            </Card>
        )
}
export default withStyles(styles)(Post);

