import React from 'react';
import {Select, MenuItem, withStyles, IconButton} from '@material-ui/core';
import BootstrapInput from './inputField';
import DropdownIcon from '../../assets/icons/dropdownIcon';

const MenuProps = {
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  transformOrigin: {
    vertical: -10,
    horizontal: 'left',
  },
  autoFocus: false,
};

const styles = (theme) => ({
  MenuItem_root: {
    minHeight: 0,
    height: 40,
    padding: '4px 19px',
    color: '#FCFCFD',
    fontSize: 14,
    fontWeight: 'bold',
    margin: '10px 8px 10px 8px',
    paddingLeft: 12,
    borderRadius: 12,
    '&:hover, &:focus': {
      backgroundColor: '#383838',
    },
    backgroundColor: '#23262F',
  },
  MenuItem_selected: {
    color: '#FCFCFD',
    backgroundColor: '#141416 !important',
    margin: '10px 8px 10px 8px',
    borderRadius: 12,
    paddingLeft: 12,
  },
  Select_root: {
    height: '100%',
  },
  Select_select: {
    padding: 20,
    '&:focus': {
      backgroundColor: 'transparent',
    },
  },
  MenuList_list: {
    paddingRight: '0px !important',
    width: '100% !important',
    backgroundColor: '#23262F',
  },
  MenuList_paper: {
    maxHeight: 250,
    border: '2px solid #353945',
    boxShadow: '0px 64px 64px -48px rgba(31, 47, 70, 0.12)',
  },
  placeholder: {
    color: '#FCFCFD',
    cursor: 'pointer !important',
  },
  Placeholder_selected: {
    backgroundColor: 'transparent',
  },
  input_root: {
    cursor: 'pointer !important',
  },
  dropdownIcon: {
    pointerEvents: 'none',
    bottom: 10,
    padding: '6px !important',
  },
});

export default withStyles(styles)(({
  data = [],
  value,
  multiple = false,
  onChange = () => {},
  name,
  renderValue,
  classes,
  width,
  style = {},
  displayEmpty,
  placeholder,
  error,
  label,
  id,
  info,
  placement,
  helperText,
  onClose,
  disabled,
  inputProps,
  LabelProps,
  ...rest
}) => {

  const dropdownIcon = (
    ({ ...rest }) => {
      return (
        (<IconButton
          classes={{
            root: classes.dropdownIcon
          }}
          {...rest}
        >
          <DropdownIcon />
        </IconButton>)
      );
    }
  );

  const menuItems = data.map((datum) => (
    <MenuItem
      key={datum.name}
      value={datum.value}
      disabled={datum.disabled}
      classes={{
        root: classes.MenuItem_root,
        selected: classes.MenuItem_selected,
      }}
    >
      {datum.name}{datum.extraLabel ? ` (${datum.extraLabel})` : null}
    </MenuItem>
  ));
  if (placeholder) {
    menuItems.unshift(
      <MenuItem
        key="placeholder"
        disabled
        value=""
        classes={{
          root: classes.MenuItem_root,
          selected: classes.Placeholder_selected,
        }}
      >
        {placeholder}
      </MenuItem>,
    );
  }
  return (
    <Select
      multiple={multiple}
      value={value}
      onChange={onChange}
      input={
        (
          <BootstrapInput
            label={label}
            error={error}
            info={info}
            placement={placement}
            id={id}
            helperText={helperText}
            style={{ width, ...style }}
            InputProps={{
              classes: {
                root: placeholder && !value && value !== 0 ? classes.placeholder : classes.input_root,
              },
            }}
            inputProps={inputProps}
            LabelProps={LabelProps}
          />
        )
      }
      renderValue={renderValue}
      name={name}
      IconComponent={dropdownIcon}
      classes={{
        select: classes.Select_select,
      }}
      MenuProps={{
        classes: {
          paper: classes.MenuList_paper,
          list: classes.MenuList_list,
        },
        ...MenuProps,
      }}
      displayEmpty={placeholder ? true : displayEmpty}
      error={error}
      onClose={onClose}
      disabled={disabled || false}
      {...rest}
    >
      {menuItems}
    </Select>
  );
});
