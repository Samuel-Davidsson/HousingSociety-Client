import axios from "axios";
import { CLEAR_ERRORS, LOADING_UI, SET_ERRORS, SET_USER, SET_UNAUTHENTICATED, LOADING_USER, MARK_NOTIFICATIONS } from "../types";

export const loginUser = (userData, history) => dispatch => {
    dispatch({type: LOADING_UI});
    axios.post("/login", userData)
    .then(res => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({type: CLEAR_ERRORS});
        history.push("/");   
    })
    .catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    }); 
};

export const getUserData = () => dispatch => {
    dispatch({type: LOADING_USER});
    axios
      .get("/user")
      .then((res) => {
        dispatch({
          type: SET_USER,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };

export const signupUser = (userData, history) => dispatch => {
    dispatch({ type: LOADING_UI });
    console.log(userData);
    axios.post("/signup", userData)
    .then(res => {
        console.log(res);
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({type: CLEAR_ERRORS});
        history.push("/");   
    })
    .catch((err) => {
        console.log(err.response.data);
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    }); 
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem("FBIdToken");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({type: SET_UNAUTHENTICATED});
};

const setAuthorizationHeader = token => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem("FBIdToken", FBIdToken);
    axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const uploadImage = formData => dispatch => {
    dispatch({type: LOADING_USER});
    axios.post("/user/image", formData)
    .then(res => {
        dispatch(getUserData());        
    })
    .catch(err => console.log(err));
};

export const editUserDetails = userDetails => dispatch => {
    dispatch({type : LOADING_USER});
    axios.post("/user", userDetails)
    .then(() => {
        dispatch(getUserData());
    })
    .catch(err => console.log(err));
};

export const markNotificationsRead = notificationsIds => dispatch => {
    axios.post("/notifications", notificationsIds)
    .then(res => {
        dispatch({
            type: MARK_NOTIFICATIONS
        });
    })
    .catch(err => console.log(err))
};
