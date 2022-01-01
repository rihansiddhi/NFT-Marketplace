import React, {useCallback, useEffect, useState} from "react";
import {Box, makeStyles, Tab, Tabs, useTheme} from "@material-ui/core";
import TabPanel from "../helperComponents/tabPanel";
import MyNftsContainer from "../MyNfts/myNftsContainer";
import TwitterTags from "../TwitterTags/TwitterTags";
import withNavbarHOC from "../Navbar/withNavbarHOC";
import CreateNft from "../CreateNft/CreateNft";
import SwipeableViews from "react-swipeable-views";
import walletContainerStyles from "../../styles/Wallet/walletContainer";
import {useDispatch, useSelector} from "react-redux";
import AssetContainer from "../asset/assetContainer";
import * as sdac from "museblockchain-js";
import {getMyNfts, setMyNfts} from "../../redux/actions/nftActions";
import {setLoader} from "../../redux/actions/flagActions";
import {debounce} from "lodash";
const WalletContainer = () => {
  const theme = useTheme();
  const [tab, setTab] = useState(0);
  // const tabLabels = ['My Nfts', 'Twitter', 'Create NFT'];
  const tabLabels = ['My Nfts', 'Twitter'];
  const useStyles = makeStyles(walletContainerStyles);
  const classes = useStyles();
  const selectedNft = useSelector(state => state.nft.selectedNft);
  const username = useSelector(state => state.user.username);
  const dispatch = useDispatch();

  const getAssetsCall = () => dispatch(getMyNfts());

  const debouncedGetAssetCall = useCallback(debounce(getAssetsCall, 1000), []);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    sdac.config.set("websocket", "wss://api.bitcoinmusic.org");
    sdac.api.streamOperationsAsync((error, result) => {
      debouncedGetAssetCall();
    });
  }, []);

  return selectedNft
    ? <AssetContainer />
    : (<Box>
      <Box pl={3} pr={3}>
        <Tabs
          variant="fullWidth"
          value={tab}
          onChange={(event, value) => setTab(value)}
          indicatorColor="primary"
          textColor="primary"
        >
          {tabLabels.map((label, index) =>
            <Tab
              key={label}
              label={label}
              value={index}
              classes={{ root: classes.tabs }}
              // icon={this.renderIcon(index, this.state.key)}
            />
          )}
        </Tabs>
      </Box>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tab}
        onChangeIndex={setTab}
      >
        <TabPanel index={0} value={tab}>
          <MyNftsContainer setTab={setTab} />
        </TabPanel>
        <TabPanel index={1} value={tab}>
          <TwitterTags />
        </TabPanel>
        <TabPanel index={2} value={tab}>
          <CreateNft />
        </TabPanel>
      </SwipeableViews>
    </Box>);
};

export default withNavbarHOC(WalletContainer);