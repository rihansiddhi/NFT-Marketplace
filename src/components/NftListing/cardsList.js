import React from "react";
import { cardOptions } from "../../constants/NftListing";
import NftCard from "../helperComponents/nftCard";
import { Grid } from "@material-ui/core";

const CardsList = () => {
  return (
    <Grid container spacing={6}>
      {cardOptions.map(({ name }) =>
        <Grid item xs={12} md={4}>
          <NftCard />
        </Grid>
      )}
    </Grid>
  );
};

export default CardsList;