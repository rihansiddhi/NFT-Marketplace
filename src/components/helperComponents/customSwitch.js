import React from 'react';
import * as PropTypes from 'prop-types';
import cn from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    width: 50,
    height: 30,
    position: 'relative',
  },
  root: {
    width: '100%',
    height: '100%',
    padding: 0,
  },
  switchBase: {
    padding: 0,
    '&$checked': {
      transform: 'translateX(20px)',
      color: 'white',
      '& + $track': {
        backgroundColor: '#4aade6',
        opacity: 1,
      },
    },
    '&$focusVisible $thumb': {
      color: '#4aade6',
    },
    '& input': {
      margin: 0,
    },
  },
  thumb: {
    width: 26,
    height: 26,
    margin: 2,
  },
  track: {
    borderRadius: 16,
    backgroundColor: '#aeaeaf',
    opacity: 1,
  },
  checked: {},
  focusVisible: {},
  textOnThumb: (props) => ({
    position: 'absolute',
    fontFamily: 'Quicksand, sans-serif !important',
    fontSize: 9,
    fontWeight: 600,
    textTransform: 'uppercase',
    top: 8,
    color: props.checked ? '#4aade6' : 'grey',
    right: props.checked ? 8 : 27,
    cursor: 'pointer',
    pointerEvents: 'none',
  }),
  loader: {
    position: 'absolute',
    top: 6,
    right: -25,
  },
});

const BasicSwitch = (props) => {
  const classes = useStyles(props);
  const {
    checked, loading, thumbText,
    classes: {
      track,
      textOnThumb,
      container,
      switchBase,
    },
    ...rest
  } = props;
  return (
    <div className={cn(classes.container, container)}>
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: cn(classes.switchBase, switchBase),
          thumb: classes.thumb,
          track: cn(classes.track, track),
          checked: classes.checked,
        }}
        checked={checked}
        {...rest}
      />
      <span className={cn(classes.textOnThumb, textOnThumb)}>{thumbText || (checked ? 'On' : 'Off')}</span>
      {loading && (
        <span className={classes.loader}>
          <i className="fa fa-spinner fa-spin" />
        </span>
      )}
    </div>
  );
};

BasicSwitch.propTypes = {
  checked: PropTypes.bool,
  loading: PropTypes.bool,
  thumbText: PropTypes.string,
  classes: PropTypes.shape(PropTypes.object),
};

BasicSwitch.defaultProps = {
  checked: false,
  loading: false,
  thumbText: '',
  classes: {
    track: '',
    textOnThumb: '',
    container: '',
    switchBase: '',
  },
};

export default function CustomSwitch(props) {
  const { status, onChange, ...rest } = props;

  const handleChange = (event) => {
    const { checked } = event.target;
    onChange(checked);
  };

  return (
    <BasicSwitch checked={status} onChange={handleChange} {...rest} />
  );
}

CustomSwitch.propTypes = {
  onChange: PropTypes.func,
  status: PropTypes.bool,
};

CustomSwitch.defaultProps = {
  onChange: () => {},
  status: false,
};
