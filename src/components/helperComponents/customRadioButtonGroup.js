import React from 'react';
import { FormControl, withStyles } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioUncheckedSVG from '../SVGIcons/RadioUncheckedSVG';
import RadioCheckedSVG from '../SVGIcons/RadioCheckedSVG';
import InputLabel from './inputLabel';

const styles = {
  FormGroup_root: {
    flexDirection: 'row',
  },
  FormControl_root: {
    backgroundColor: '#F1F1F1',
    borderRadius: '10px',
    padding: '10px',
    width: '100%',
    marginBottom: '10px',
    display: 'block',
  },
  FormControlLabel_label: {
    fontWeight: '600',
  },
};

export default withStyles(styles)((props) => {
  const {
    classes, name, info, label, value, handleChange, data,
  } = props;
  return (
    <FormControl component="fieldset" classes={{ root: classes.FormControl_root }}>
      <InputLabel
        id={name}
        info={info}
        placement="right"
        label={label}
      />
      <RadioGroup
        classes={{ root: classes.FormGroup_root }}
        aria-label="form_group_label"
        name={props.name}
        value={value}
        onChange={handleChange}
      >
        {data.map((datum) => (
          <FormControlLabel
            key={datum.value}
            classes={{ label: classes.FormControlLabel_label }}
            value={datum.value}
            control={(
              <Radio
                color="secondary"
                disabled={datum.disabled !== undefined ? datum.disabled : false}
                icon={<RadioUncheckedSVG />}
                checkedIcon={<RadioCheckedSVG />}
              />
            )}
            label={datum.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
});
