import React, {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Grid, makeStyles} from "@material-ui/core";
import ViewAsset from "./viewAsset";
import {Redirect} from "react-router-dom";
import AssetInfo from "./assetInfo";
import Button from "../helperComponents/customButton";
import {selectNft} from "../../redux/actions/nftActions";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import assetContainerStyles from "../../styles/asset/assetContainer";

const AssetContainer = () => {
  const selectedNft = useSelector(state => state.nft.selectedNft);
  const dispatch = useDispatch();
  const useStyles = makeStyles(assetContainerStyles);
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!selectedNft) {
    return <Redirect to="/wallet" />;
  }

  return (
    <Fragment>
      <Button
        classes={{ root: classes.backButton }}
        onClick={() => dispatch(selectNft(null))}
      >
       <ArrowBackIosIcon /> Back to My NFTs
      </Button>
      <Box pt={3}>
        <Grid container justify="space-between" spacing={10}>
          <Grid item xs={12} sm={6} lg={8} classes={{ root: classes.assetView }}>
            <ViewAsset />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} classes={{ root: classes.assetInfo }}>
            <AssetInfo />
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );

};

export default AssetContainer;