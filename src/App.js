import React, { Fragment, Suspense } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from './utils/theme';
import ListingContainer from "./components/NftListing/listingContainer";
import Wrapper from "./components/CreateNft/Wrapper";
import TwitterTags from "./components/TwitterTags/TwitterTags";

import LoginAndRegisterContainer from "./components/LoginAndRegister/loginAndRegisterContainer";
import Snackbar from "./components/helperComponents/snackbar";
import Loader from "./components/helperComponents/loader";
import {useSelector} from "react-redux";
import MyNftsContainer from "./components/MyNfts/myNftsContainer";
import WalletContainer from "./components/Wallet/walletContainer";

function App() {
  if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
  }
  const isLoading = useSelector(state => state.flags.isLoading);
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Snackbar />
        {isLoading && <Loader />}
        <Suspense fallback={<Fragment />}>
          <Switch>
            <Route exact path="/">
              <LoginAndRegisterContainer />
            </Route>
            <Route path="/wallet">
              <WalletContainer />
            </Route>
            <Route path="/create_nft">
              <Wrapper />
            </Route>
            <Route path="/marketplace">
              <ListingContainer />
            </Route>
          </Switch>
        </Suspense>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
