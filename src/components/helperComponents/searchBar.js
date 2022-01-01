import React, { Fragment } from "react";
import InputField from "./inputField";
import * as PropTypes from "prop-types";
import { Hidden } from "@material-ui/core";
import SearchIcon from "../../assets/icons/searchIcon";
import SecondarySearchIcon from "../../assets/icons/secondarySearchIcon";
import searchBarStyles from "../../styles/helperComponents/searchBar";
import { makeStyles } from "@material-ui/core/styles";

const SearchBar = ({
                     value,
                     onChange,
                     placeholder,
                     style,
                   }) => {

  const useStyles = makeStyles(searchBarStyles);
  const classes = useStyles();

  return (
    <Fragment>
      <Hidden mdUp>
        <InputField
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          style={style}
          endAdornment={<SearchIcon />}
          fullWidth
        />
      </Hidden>
      <Hidden smDown>
        <InputField
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          style={style}
          endAdornment={<SecondarySearchIcon />}
          classes={{
            root: classes.inputRoot,
          }}
          fullWidth
        />
      </Hidden>
    </Fragment>
  );
};

export default SearchBar;