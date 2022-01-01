import React from 'react';
import { Box, Chip } from "@material-ui/core";
import { itemTypeOptions } from "../../constants/NftListing";
import {makeStyles} from "@material-ui/core/styles";
import chipsCollectionStyles from "../../styles/NftListing/chipsCollection";

const ChipsCollection = ({
  selectedValue
                         }) => {
  const useStyles = makeStyles(chipsCollectionStyles);
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent={{ xs: "flex-start", md: "flex-end" }} >
      {itemTypeOptions.map(({ name, value }) =>
        <Chip
          label={name}
          clickable
          classes={{
            root: selectedValue === value ? classes.selected : classes.default,
          }}
        />
      )}
    </Box>
  );
};

export default ChipsCollection;