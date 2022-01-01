import React, {Fragment, useState} from "react";
import SearchBar from "../helperComponents/searchBar";
import { Box, Divider, Grid, Hidden } from "@material-ui/core";
import listingContainerStyles from "../../styles/NftListing/listingContainer";
import { makeStyles } from "@material-ui/core/styles";
import FilterSection from "./filterSection";
import CardsList from "./cardsList";
import Select from "../helperComponents/staticSelect";
import {recentOptions} from "../../constants/NftListing";
import ChipsCollection from "./chipsCollection";
import withNavbarHOC from "../Navbar/withNavbarHOC";

const ListingContainer = () => {

  const [search, setSearch] = useState('');
  const useStyles = makeStyles(listingContainerStyles);
  const classes = useStyles();

return (
  <Box p={3}>
    <SearchBar
      value={search}
      onChange={setSearch}
      placeholder="Type your Keywords"
    />
    <Hidden smDown>
      <Divider
        classes={{
          root: classes.divider,
        }}
      />
    </Hidden>
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Select
          value="Recently Added"
          data={recentOptions}
        />
      </Grid>
      <Grid item xs={12} md={9}>
        <ChipsCollection selectedValue="All Items" />
      </Grid>
      <Grid item xs={12} md={3}>
        <FilterSection />
      </Grid>
      <Grid item xs={12} md={9}>
        <CardsList />
      </Grid>
    </Grid>
  </Box>
);
};

export default withNavbarHOC(ListingContainer);