import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import CalenderToday from "@material-ui/icons/CalendarToday";
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import LinkIcon from "@material-ui/icons/Link";
import LocationOn from "@material-ui/icons/LocationOn";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";
import MyButton from '../../util/MyButton';
import EditDetails from "./EditDetails";
import theme from "../../util/theme";


const styles = theme;
    

const Profile = props => {

    const { classes, user: { credentials : { handle, createdAt, imageUrl, bio, website, location}, loading, authenticated }} = props;

    const handleImageChange = event => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        props.uploadImage(formData);
    };

    const handleEditImage = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    };

    const handleLogout = () => {
      props.logoutUser();
    };

    let profileMarkup = !loading ? (authenticated ? (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className="profile-image"/>
                    <input type="file" id="imageInput" hidden="hidden" onChange={handleImageChange} />
                   <MyButton tip="Edit profile picture" onClick={handleEditImage} btnClassName="button">
                     <EditIcon color="primary" />
                   </MyButton>
                </div>
                <hr />
                <div className="profile-details">
                    <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                        @{handle}
                    </MuiLink>
                    <hr />
                    {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr />
                    {location && (
                        <Fragment>
                        <LocationOn color="primary" /> <span>{location}</span>
                        <hr />
                       </Fragment>
                    )}
                    {website && (
                        <Fragment>
                        <LinkIcon color="primary" />
                        <a href={website} target="_blank" rel="noopener noreferrer">
                            {" "}{website}
                        </a>
                        <hr />
                        </Fragment>
                    )}
                    <CalenderToday color="primary"/>{" "}
                    <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
                </div>
                <MyButton tip="Logut" onClick={handleLogout}>
                     <KeyboardReturn color="primary" />
                   </MyButton>
                <EditDetails />
            </div>
        </Paper>
    ) : (
        <Paper className={classes.paper}>
            <Typography variant="body2" align="center">
                No profile found please login again
            </Typography>
            <div className={classes.buttons}>
                <Button variant="contained" color="primary" component={Link} to="/login">
                    Login
                </Button>
                <Button variant="contained" color="secondary" component={Link} to="/signup">
                    Signup
                </Button>
            </div>
        </Paper>
    )) : (<p>Loading...</p>)
        return profileMarkup;
};

const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = { logoutUser ,uploadImage };

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
