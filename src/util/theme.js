
export default {
    palette:{
        primary: {
          light: "#33c9dc",
          main: "#00bcd4",
          dark: "#008394",
          contrastText: "#fff"
        },
        secondary: {
          light: "#ff6333",
          main: "#ff3d00",
          dark: "#b22a00",
          contrastText: "#fff"
        }
      },
      typography: {
        useNextVariants: true,
      },
      form: {
        textAlign: "center"
    },
    image: {
        margin: "20px, auto, 20px, auto"
    },
    pageTitle: {
        margin: "10px, auto, 10px, auto"
    },
    textField: {
        margin: "10px, auto, 10px, auto"
    },
    editbutton: {
      float: "right"
    },
    button: {
        marginTop: 20,
        position: "relative",
    },
    customError: {
        color: "red",
        fontSize: "0.8rem",
        marginTop: 10
    },
    progress: {
        position: "absolute"
    },    
    deleteButton: {
      position: "absolute",
      left: "55%",
    },
    closeButton: {
      position: "absolute",
      left: "88%",
      top: "1.5%"
    },
    submitButton: {
      position: "relative",
      float: "right",
      marginTop: 10
    },
    invisibleSeparator: {
      border: "none",
      margin: 4
    },
    profileImage: {
      maxWidth: 200,
      height: 200,
      borderRadius: "50%",
      objectFit: "cover"
    },
    dialogContent: {
      padding: 20
    },
    expandButton: {
      position: "absolute",
      left: "50%"
    },
    spinnerDiv: {
      textAlign: "center",
      marginTop: 50,
      marginBottom: 50,
    },
    visableSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20
    },
    commentImage: {
      maxWidth: "100%",
      height: 100,
      objectFit: "cover",
      borderRadius: "50%"
    },
    commentData: {
      marignLeft: 20
    },
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: "primary"
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
  };