import React, {
  useState,
  useEffect,
} from 'react';
import cn from 'classnames';
import {
  makeStyles,
  Snackbar as MuiSnackBar,
  SnackbarContent as MuiSnackbarContent,
} from '@material-ui/core';
import EventEmitter from 'eventemitter3';
import { amber } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import IconButton from '@material-ui/core/IconButton';
import { debounce } from 'lodash';
import CloseIcon from '@material-ui/icons/Close';

const EE = new EventEmitter();

const ERROR = 'ERROR';
const INFO = 'INFO';
const SUCCESS = 'SUCCESS';
const WARNING = 'WARNING';

export const snackbar = {
  error: (msg, duration = null, horizontal, vertical) => EE.emit(ERROR, msg, duration, horizontal, vertical),
  info: (msg, duration = 2000, horizontal, vertical) => EE.emit(INFO, msg, duration, horizontal, vertical),
  success: (msg, duration = 2000,horizontal, vertical) => EE.emit(SUCCESS, msg, duration, horizontal, vertical),
  warning: (msg, duration = 7000, horizontal, vertical) => EE.emit(WARNING, msg, duration, horizontal, vertical),
};

const variantIcon = {
  error: ErrorIcon,
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: WarningIcon,
};

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: 500,
    width: '100%',
    whiteSpace: 'nowrap',
    flexFlow: 'row',
  },
  modifiedRoot: {
    whiteSpace: 'pre-wrap',
    minWidth: '605px',
  },
  success: {
    backgroundColor: '#45B36B',
  },
  error: {
    backgroundColor: '#ffd2d8',
    color: theme.palette.error.dark,
    border: '2px solid #fb9ba9',
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 700,
    fontSize: '1rem',
    whiteSpace: 'pre-wrap',
  },
  close: {
    '& *': {
      fill: 'currentColor',
    },
  },
}));

function Snackbar() {
  const initialState = {
    open: false,
    message: '',
    variant: 'success',
    duration: null,
    vertical: null,
    horizontal: null
  };
  const classes = useStyles();
  const [state, setState] = useState(initialState);
  const { open, message, variant, duration, horizontal, vertical } = state;
  const debouncedSetState = debounce((state) => setState(state), 200);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setState(initialState);
  };

  useEffect(() => {
    const showSnackbar = (variant) => (message, duration, horizontal, vertical) => {
      setState(({ open }) => {
        const newState = { message, variant, duration, open: true, horizontal, vertical };
        if (!open) {
          return newState;
        }

        debouncedSetState(newState);

        return initialState;
      });
    };

    EE.on(ERROR, showSnackbar('error'));
    EE.on(INFO, showSnackbar('info'));
    EE.on(SUCCESS, showSnackbar('success'));
    EE.on(WARNING, showSnackbar('warning'));

    return () => EE.removeAllListeners();
  }, []);

  const Icon = variantIcon[variant];
  return (
    <MuiSnackBar
      key={message}
      open={open}
      anchorOrigin={{
        vertical: vertical ? vertical : "top",
        horizontal: horizontal ? horizontal : "center"
      }}
      autoHideDuration={duration}
      onClose={handleClose}
    >
      <MuiSnackbarContent
        className={(message && message.length > 75) ? cn(classes.root, classes[variant], classes.modifiedRoot) : cn(classes.root, classes[variant])}
        aria-describedby="client-snackbar"
        message={(
          <span
            id="client-snackbar"
            className={classes.message}
          >
            <Icon className={classes.icon} />
            {/* An error object will be converted to String if passed as the message */}
            {String(message)}
          </span>
        )}
        action={(
          <IconButton
            aria-label="Close"
            color="inherit"
            onClick={handleClose}
            className={classes.close}
          >
            <CloseIcon />
          </IconButton>
        )}
      />
    </MuiSnackBar>
  );
}

export default Snackbar;
