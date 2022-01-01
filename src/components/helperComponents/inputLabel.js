import React from 'react';
import cn from 'classnames';
import { withStyles, InputLabel } from '@material-ui/core';

const styles = {
  root: {
    color: '#B1B5C4',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    position: 'relative',
    display: 'inline-flex',
    paddingTop: 11,
    textTransform: 'uppercase',
  },
  asterisk: {
    color: '#E52828',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '-4px',
  },
  shrink: {
    transform: 'none',
  },
};

export default withStyles(styles)(({
  id,
  label,
  classes,
  styleClasses: {
    root: LabelRoot,
    asterisk: LabelAsterisk,
    shrink: LabelShrink,
  } = {},
  ...props
}) => (
  <React.Fragment>
    <InputLabel
      shrink
      htmlFor={id}
      classes={{
        ...classes,
        root: cn(classes.root, LabelRoot),
        asterisk: cn(classes.asterisk, LabelAsterisk),
        shrink: cn(classes.shrink, LabelShrink),
      }}
      {...props}
    >
      {label}
    </InputLabel>
  </React.Fragment>
));
