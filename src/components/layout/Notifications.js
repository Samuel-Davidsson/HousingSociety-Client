import { MenuItem, Typography, Link } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import Tooltip from "@material-ui/core/Tooltip";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NotificationsIcon from "@material-ui/icons/Notifications";
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";




class Notifications extends Component {
    state = {
        anchorEl: null,
    };

    handleOpen = event => {
        this.setState({ anchorEl: event.target });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications
        .filter(not => !not.read)
        .map(not => not.notificationId);
        this.props.markNotificationsRead(unreadNotificationsIds);
    };

    render() {
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;
        dayjs.extend(relativeTime);

        let notificationsIcon;
        if(notifications && notifications.length > 0){
            notifications.filter(not => not.read === false).length > 0 ? notificationsIcon = (
                <Badge badgeContent={notifications.filter(not => not.read === false).length}
                color="secondary">
                <NotificationsIcon />
                </Badge>
            ) : (
                notificationsIcon = <NotificationsIcon/>
            )
        }
        else {
            notificationsIcon = <NotificationsIcon />
        }
        let notificationsMarkup = notifications && notifications.length > 0 ? (
            notifications.map(not => {
                const verb = not.type === "like" ? "liked" : "commented on";
                const time = dayjs(not.createdAt).fromNow();
                const iconColor = not.read ? "primary" : "secondary";
                const icon = not.type === "like" ? (
                    <FavoriteIcon color={iconColor} style={{marginRight: 10 }} />
                ) : (
                    <ChatIcon color={iconColor} style={{marginRight: 10 }} />
                )
                return (
                <MenuItem onClick={this.handleClose}>
                    {icon}
                    <Typography
                    component={Link}
                    color="default"
                    variant="body1"
                    to={`/users/${not.recipient}/post/${not.postId}`}>
                        {not.sender} {verb} your post {time}
                    </Typography>
                </MenuItem>
                )
            })
        ) : (
            <MenuItem onClick={this.handleClose}>
            You have no notifications atm.
            </MenuItem>
        )
        return (
            <Fragment>
                <Tooltip placement="top" title="Notifications">
                    <IconButton aria-owns={anchorEl ? "simple-menu" : undefined }
                    aria-haspopup="true" onClick={this.handleOpen}>
                        {notificationsIcon}
                    </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                onEntered={this.onMenuOpened}>
                    {notificationsMarkup}
                    </Menu> 
            </Fragment>
        )
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    notifications: state.user.notifications
});

export default connect(mapStateToProps, { markNotificationsRead })(Notifications); 

