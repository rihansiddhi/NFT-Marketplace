import React from "react";
import { Grid } from "@material-ui/core";
import MyNftCard from "./myNftCard";
import {useSelector} from "react-redux";

const MyNftsCardList = () => {
  const myNfts = useSelector(state => state.nft.myNfts);
  const search = useSelector(state => state.nft.query);
  const nftsToDisplay = myNfts.filter(({ symbol }) => symbol.toLowerCase().includes(search.toLowerCase()));
  // const test = [0, 30, 70, 200];
  return (
    <Grid container spacing={6}>
      {nftsToDisplay.length > 0
        && nftsToDisplay.map((nft, index) =>
          (<Grid item xs={12} sm={6} md={4} lg={3}>
          <MyNftCard key={nft?.asset_type} nft={nft} />
        </Grid>)
        )
      }
    </Grid>
  );
};

export default MyNftsCardList;