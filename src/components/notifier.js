import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

/* styles for the various types of message */
const styles = {
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: "#B00020",
    },
    info: {
        backgroundColor: "#3700B3",
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: "8px",
    },
    message: {
        display: "flex",
        alignItems: "center",
    },
};

/**
 * Renders the message that will be displayed by 
 * the Notifier component
 * @param {*} props 
 */
const SnackbarContentWrapper = (props) => {
    const { message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" style={styles.message}>
                    <Icon
                        style={{ ...styles.icon, ...styles.iconVariant }}
                    />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
            {...other}
        />
    );
};

let notifyFn;

// noop function
const pass = () => { };

/**
 * Notification component. Renders a snackbar. There are 
 * four types that can be rendered: error, success, warning and info.
 * Each has a different color
 */
class Notifier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            message: "",
            variant: "",
            callback: null,
        };
    }

    notify = ({ message, variant }, cb) => {
        this.setState({
            open: true,
            message,
            variant,
            callback: (cb === undefined ? pass : cb),
        });
    };

    handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        this.setState({ open: false });
        this.state.callback();
    };

    componentDidMount() {
        notifyFn = this.notify;
    }

    render() {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                    open={this.state.open}
                    autoHideDuration={1000}
                    onClose={this.handleClose}
                >
                    <SnackbarContentWrapper
                        style={styles[this.state.variant]}
                        onClose={this.handleClose}
                        variant={this.state.variant}
                        message={this.state.message}
                    />
                </Snackbar>
            </div>
        );
    }
}

/**
 * Function for serving a notification. 
 * Takes a message and type e.g error. 
 * Also takes an optional callback that is 
 * called after notification finishes
 */
export function notify({ message, variant }, cb) {
    notifyFn({ message, variant }, cb);
}

export default Notifier;
