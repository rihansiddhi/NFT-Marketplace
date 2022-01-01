import React, { Fragment } from "react";
import Navbar from "./Navbar";
import { Container } from "@material-ui/core";

const withNavbarHOC = (WrappedComponent) => class WithNavbarHOC extends React.Component {
  render() {
    return <Fragment>
      <Navbar />
      <Container>
        <WrappedComponent {...this.props} />
      </Container>
    </Fragment>
  }
};

export default withNavbarHOC;