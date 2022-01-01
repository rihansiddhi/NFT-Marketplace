import React from 'react';
import {
  Checkbox as MuiCheckbox,
  makeStyles,
  FormControlLabel,
} from '@material-ui/core';
import cn from 'classnames';
import * as PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    color: '#9CA1AB',
    borderRadius: 12,
  },
  formControlLabel_root: {
    display: 'inline',
  },
  formControlLabel_label: {
    fontSize: 14
  },
});

function Checkbox({
  value,
  label,
  disabled,
  error,
  FormControlLabelProps,
  classes: {
    root,
    ...otherClasses
  } = {},
  ...rest
}) {
  const classes = useStyles();
  return (
    <FormControlLabel
      checked={value}
      disabled={disabled}
      label={label}
      error={error}
      classes={{
        root: cn(classes.formControlLabel_root, root),
        label: cn(classes.formControlLabel_label, label),
      }}
      control={(
        <MuiCheckbox
          classes={{
            root: cn(classes.root, root),
            ...otherClasses,
          }}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...rest}
        />
      )}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...FormControlLabelProps}
    />
  );
}

Checkbox.defaultProps = {
  value: false,
  label: '',
  disabled: false,
  error: false,
  FormControlLabelProps: {},
  classes: {},
};

Checkbox.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  FormControlLabelProps: PropTypes.shape(PropTypes.object),
  classes: PropTypes.shape(PropTypes.object),
};

export default Checkbox;
