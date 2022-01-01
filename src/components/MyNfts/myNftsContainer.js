import React, {useEffect} from "react";
import SearchBar from "../helperComponents/searchBar";
import {Box, Button, Divider, Grid, Hidden, makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getMyNfts, onSearch, setMyNfts} from "../../redux/actions/nftActions";
import myNftsContainerStyles from "../../styles/MyNfts/myNftsContainer";
import MyNftsCardList from "./myNftsCardList";
import * as sdac from "museblockchain-js";
import {snackbar} from "../helperComponents/snackbar";
import {setLoader} from "../../redux/actions/flagActions";

const MyNftsContainer = ({
                           setTab
                         }) => {

  const search = useSelector(state => state.nft.query);
  const isLoading = useSelector(state => state.flags.isLoading);
  const myNfts = useSelector(state => state.nft.myNfts);
  const username = useSelector(state => state.user.username);
  const dispatch = useDispatch();
  const setSearch = (value) => {
    dispatch(onSearch(value));
  };
  const useStyles = makeStyles(myNftsContainerStyles);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getMyNfts());
  }, []);
  return (
    <Box p={3}>
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Type your Keywords"
      />
      <Hidden mdUp>
        <br />
      </Hidden>
      <Hidden smDown>
        <Divider
          classes={{
            root: classes.divider,
          }}
        />
      </Hidden>
      <Grid container spacing={3}>
        {(myNfts.length > 0
            ? <MyNftsCardList />
            : !isLoading && <Box classes={{ root: classes.noResults }}>
              {"There is nothing to show here. "}
              <Button
                classes={{ root: classes.link }}
                // onClick={() => setTab(2)}
              >
                {"Create an NFT"}
              </Button>              
            </Box>
        )}
      </Grid>
    </Box>
  );
};

export default MyNftsContainer;