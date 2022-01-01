import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import cn from 'classnames';
import {
  Button as MuiButton,
  makeStyles,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import * as PropTypes from 'prop-types';

const useStyles = makeStyles(({ palette }) => ({
  root: {
    borderRadius: 90,
    fontSize: 14,
    lineHeight: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    boxShadow: 'none',
    color: palette.common.text,
    '&:active': {
      boxShadow: 'none',
    },
    height: 48,
  },
  label: {
    textTransform: 'none',
  },
  contained: {
    paddingRight: 30,
    paddingLeft: 30,
  },
  outlined: (props) => {
    const { color } = props;
    let mainColor = color;
    if (['primary', 'secondary', 'error'].includes(color)) {
      mainColor = palette[color].main;
    }

    return {
      borderWidth: 2,
      border: `1px solid ${mainColor}`,
      color: mainColor,
      opacity: 1,
      '&:hover': {
        border: `2px solid ${mainColor}`,
        backgroundColor: fade(mainColor, palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
    };
  },
}));

function Button(props) {
  const {
    width,
    style = {},
    classes: {
      root,
      label,
      contained,
      outlined,
      ...otherClasses
    } = {},
    ...otherProps
  } = props;
  const classes = useStyles(props);
  return (
    <MuiButton
      classes={{
        root: cn(classes.root, root),
        label: cn(classes.label, label),
        contained: cn(classes.contained, contained),
        outlined: cn(classes.outlined, outlined),
        ...otherClasses,
      }}
      style={{
        width,
        ...style,
      }}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...otherProps}
    />
  );
}

Button.defaultProps = {
  width: '',
  color: 'primary',
  style: {},
  classes: {},
};

Button.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  color: PropTypes.string,
  style: PropTypes.shape(PropTypes.object),
  classes: PropTypes.shape(PropTypes.object),
};

export default Button;
