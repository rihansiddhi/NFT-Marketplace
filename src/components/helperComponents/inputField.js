import React from 'react';
import cn from 'classnames';
import {
  makeStyles,
  FormControl as MuiFormControl,
  FormHelperText as MuiFormHelperText,
  InputBase as MuiInputBase,
  InputAdornment as MuiInputAdornment,
} from '@material-ui/core';
import * as PropTypes from 'prop-types';
import InputLabel from './inputLabel';

const useInputStyles = makeStyles((theme) => ({
  Input_root: {
    width: '100%',
    color: '#FCFCFD',
    height: 48,
    backgroundColor: theme.palette.common.darkBlack,
    border: '2px solid #353945',
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create([
      'border-color',
      'box-shadow',
      'background-color',
    ]),
    fontWeight: '600',
    '&:focus-within, &:hover:not($disabled)': {
      backgroundColor: 'theme.palette.common.darkBlack',
      borderColor: '#aaa',
      padding: 0,
      margin: 0,
    },
  },
  Input_input: {
    fontSize: 14,
    padding: 0,
    paddingLeft: 13,
    paddingRight: 22,
    maxHeight: 91,
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
  Input_placeholder: {
    color: '#FCFCFD',
  },
  Input_error: {
    borderColor: theme.palette.error.main,
    '&:focus-within, &:hover': {
      borderColor: `${theme.palette.error.main} !important`,
      borderRadius: theme.shape.borderRadius,
    },
  },
  Input_disabled: {
    borderColor: '#dfdfdf',
    '&:hover': {
      backgroundColor: '#fff !important',
      borderColor: '#dfdfdf !important',
      borderRadius: theme.shape.borderRadius,
    },
  },
  Input_multiline: {
    height: '70px !important',
    overflowY: 'hidden !important',
    padding: '15px 0px !important',
    boxSizing: 'content-box',
  },
  Input_inputMultiline: {
    overflowY: 'auto !important',
    height: '100% !important',
    resize: 'none',
  },
  InputAdornment_root: {
    color: 'white',
    fontSize: 16,
  },
  Input_adornedStart: {
    paddingLeft: '10px !important',
  },
  Input_inputAdornedStart: {
    textAlign: 'left',
  },
  Input_adornedEnd: {
    paddingRight: '10px !important',
  },
  Input_inputAdornedEnd: {
    textAlign: 'left',
  },
  FormControl_root: {
    display: 'block',
    paddingBottom: 17,
  },
  Input_helperText: {
    fontSize: 12,
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

function InputField({
  defaultValue,
  onChange,
  label,
  helperText,
  error,
  disabled,
  id,
  name,
  InputProps: {
    classes: {
      root: InputRoot,
      input: InputInput,
      error: InputError,
      disabled: InputDisabled,
      adornedEnd: InputAdornedEnd,
      adornedStart: InputAdornedStart,
      inputAdornedStart: InputInputAdornedStart,
      inputAdornedEnd: InputInputAdornedEnd,
      multiline: InputMultiline,
      inputMultiline: InputInputMultiline,
      ...otherInputClasses
    },
    ...otherInputProps
  },
  LabelProps: {
    styleClasses: labelClasses,
    ...otherLabelprops
  },
  FormControlProps,
  disableUnderline,
  fullWidth,
  inputComponent,
  multiline,
  type,
  required,
  width,
  rows,
  rowsMax,
  placeholder,
  displayEmpty,
  readOnly,
  autoWidth,
  startAdornment,
  endAdornment,
  autoComplete,
  style,
  value,
  info,
  placement,
  ...rest
}) {
  const classes = useInputStyles();

  const InputStartAdornment = startAdornment && (
    <MuiInputAdornment
      classes={{
        root: cn(classes.InputAdornment_root),
      }}
      disableTypography
      position="start"
    >
      {startAdornment}
    </MuiInputAdornment>
  );

  const InputEndAdornment = endAdornment && (
    <MuiInputAdornment
      classes={{
        root: cn(classes.InputAdornment_root),
      }}
      disableTypography
      position="end"
    >
      {endAdornment}
    </MuiInputAdornment>
  );

  return (
    <MuiFormControl
      disabled={disabled}
      error={error}
      required={required}
      fullWidth={fullWidth}
      classes={{
        root: classes.FormControl_root,
      }}
      style={{
        width,
        ...style,
      }}
      {...FormControlProps}
    >
      {label && (
        <InputLabel
          label={label}
          id={id}
          info={info}
          placement={placement}
          styleClasses={labelClasses}
          {...otherLabelprops}
        />
      )}
      <MuiInputBase
        name={name}
        value={value}
        defaultValue={defaultValue}
        id={id}
        startAdornment={InputStartAdornment}
        endAdornment={InputEndAdornment}
        onChange={onChange}
        readOnly={readOnly}
        inputComponent={inputComponent}
        multiline={multiline}
        type={type}
        rows={rows}
        placeholder={placeholder}
        rowsMax={rowsMax}
        classes={{
          root: cn(classes.Input_root, InputRoot, placeholder && !value && value !== 0 ? classes.Input_placeholder : ''),
          input: cn(classes.Input_input, InputInput),
          error: cn(classes.Input_error, InputError),
          disabled: cn(classes.Input_disabled, InputDisabled),
          multiline: cn(classes.Input_multiline, InputMultiline),
          inputMultiline: cn(classes.Input_inputMultiline, InputInputMultiline),
          adornedStart: cn(classes.Input_adornedStart, InputAdornedStart),
          inputAdornedStart: cn(classes.Input_inputAdornedStart, InputInputAdornedStart),
          adornedEnd: cn(classes.Input_adornedEnd, InputAdornedEnd),
          inputAdornedEnd: cn(classes.inputAdornedEnd, InputInputAdornedEnd),
          ...otherInputClasses,
        }}
        {...otherInputProps}
        {...rest}
      />
      {helperText && (
        <MuiFormHelperText
          classes={{
            root: classes.Input_helperText,
          }}
        >
          {helperText}
        </MuiFormHelperText>
      )}
    </MuiFormControl>
  );
}

export default InputField;

InputField.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  InputProps: PropTypes.shape(PropTypes.object),
  LabelProps: PropTypes.shape(PropTypes.object),
  FormControlProps: PropTypes.shape(PropTypes.object),
  disableUnderline: PropTypes.bool,
  fullWidth: PropTypes.bool,
  inputComponent: PropTypes.elementType,
  multiline: PropTypes.bool,
  type: PropTypes.string,
  required: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  rows: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  rowsMax: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  placeholder: PropTypes.string,
  displayEmpty: PropTypes.bool,
  readOnly: PropTypes.bool,
  autoWidth: PropTypes.bool,
  startAdornment: PropTypes.node,
  endAdornment: PropTypes.node,
  autoComplete: PropTypes.string,
  style: PropTypes.shape(PropTypes.object),
};

InputField.defaultProps = {
  defaultValue: '',
  onChange: () => {},
  label: '',
  helperText: '',
  error: false,
  disabled: false,
  id: '',
  name: '',
  value: '',
  InputProps: {
    classes: {},
  },
  LabelProps: {
    styleClasses: {},
  },
  FormControlProps: {},
  disableUnderline: false,
  fullWidth: false,
  inputComponent: 'input',
  multiline: false,
  type: 'text',
  required: false,
  width: '100%',
  rows: 10,
  rowsMax: 10,
  placeholder: '',
  displayEmpty: true,
  readOnly: false,
  autoWidth: false,
  startAdornment: null,
  endAdornment: null,
  autoComplete: '',
  style: {},
};
